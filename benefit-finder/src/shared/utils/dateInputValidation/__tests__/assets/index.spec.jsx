const IndexHTML = () => {
  return (
    <div data-testId="time-indicator">
      <select data-testId="input-month" id="date_of_birth_month" />
      <input
        data-testId="input-day"
        id="date_of_birth_day"
        inputMode="numeric"
      />
      <input
        data-testId="input-year"
        id="date_of_birth_year"
        inputMode="numeric"
      />
    </div>
  )
}

export default IndexHTML
