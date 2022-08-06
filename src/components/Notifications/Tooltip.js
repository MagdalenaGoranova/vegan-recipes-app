
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TooltipPositionedExample({children}) {
  return (
    <OverlayTrigger
    placement={'bottom'}
    overlay={
      <Tooltip id={`tooltip-bottom`}>
        Click here to go to your profile page!
      </Tooltip>
    }>
        {children}
  </OverlayTrigger>
  )
}

export default TooltipPositionedExample;