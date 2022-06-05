const calculateAccruedAmount = (amount: number, interestRatePerYear: number, numberOfMonth: number) => {
  const interestRatePerMonth = interestRatePerYear / 12

  return Array(numberOfMonth).fill(0).reduce((acc, _, index) => {
    if (acc.length == 0) {
      acc.push(amount + calculateInterest(amount, interestRatePerMonth))
    } else {
      acc.push(acc[index - 1] + calculateInterest(acc[index - 1], interestRatePerMonth))
    }

    return acc
  }, [])
}

const calculateInterest = (amount: number, interestRate: number) => {
  console.log(amount, interestRate, amount * interestRate)
  return Math.round(amount * interestRate)
}

export default calculateAccruedAmount
