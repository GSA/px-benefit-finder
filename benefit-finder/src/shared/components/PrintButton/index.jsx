import { Button } from '../index'

/**
 * a functional component that renders a button with window print functionality
 * @component
 * @return {html} returns a semantic html button element with a custom function onClick event
 */

const PrintButton = ({ ui }) => {
  /**
   * a handler that executes our window print functionality
   */
  const handleClick = () => {
    window.print()
  }

  return (
    <Button secondary onClick={handleClick}>
      {ui}
    </Button>
  )
}

export default PrintButton
