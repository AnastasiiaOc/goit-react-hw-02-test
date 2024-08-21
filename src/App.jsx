import { useEffect, useState } from "react";
import Feedback from './Components/Feedback/Feedback.jsx'
import Options from './Components/Options/Options.jsx'
import './App.css'
import Description from './Components/Description/Description.jsx'
import Notification from './Components/Notification/Notification.jsx'

function App() {
  const [feedback, setFeedback] = useState(JSON.parse(localStorage.getItem("feedback")) ??
  {
    good: 0,
    neutral: 0,
    bad: 0
  }); 
  // usestate returns string
    // Якщо ви працюєте із складними типами даних, такими як об'єкт чи масив, не забувайте робити розбір значення за допомогою JSON.parse. В іншому випадку, замість об'єкта чи масиву ви запишете до стану їх стрічне представлення(string).
  
  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  // Якщо ви працюєте із складними типами даних, такими як об'єкт чи масив, не забувайте перетворити збережене значення у рядок за допомогою JSON.stringify.

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);
 

  const updateFeedback = (feedbackType) => {
    setFeedback({ ...feedback, [feedbackType]: feedback[feedbackType] + 1 });
  }
  //... copy object feedback to save previous data; rewrite  [feedbackType](   good: 0,
  //   neutral: 0,
  //   bad: 0,) for feedback[feedbackType] + 1;
  // usestate always returns massiv z 2 elements. Pershe meaning getter, zminna cherez yakou ya otrumujou dostup do counter, 2ga zminna - setter (setCounter)

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  }

  return (
    <>
      <div>
        <Description />
      </div>
      <div>
        <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback} />
      </div>

      <div>
        {totalFeedback > 0 ? (
          <Feedback
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positive={positiveFeedback}
            updateFeedback={updateFeedback}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  )
}

export default App;


