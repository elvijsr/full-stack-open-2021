import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </tbody>
)

const Statistics = ({good, bad, neutral}) => {
  const all = () => good + bad + neutral
  const averageCalc = () => ((good - bad) / all()).toFixed(2)
  const positiveCalc = () => ((good/all()) * 100).toFixed(2) + '%'

  if (all() === 0){
    return (
      <div>
        No feedback given!
      </div>
    )
  }

  return (
    <div>
      <table>
        <Statistic text='good' value={good}/>
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/>
        <Statistic text='total' value={all()}/>
        <Statistic text='average' value={averageCalc()}/>
        <Statistic text='positive' value={positiveCalc()}/>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = newFeedback => {
    if (newFeedback === 'bad') { setBad(bad+1) }
    else if (newFeedback === 'good') { setGood(good+1) }
    else if (newFeedback === 'neutral') { setNeutral(neutral+1) }
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={() => setFeedback('good')} text="good" />
      <Button handleClick={() => setFeedback('neutral')} text="neutral" />
      <Button handleClick={() => setFeedback('bad')} text="bad" />
      <h2>Statistics:</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

export default App