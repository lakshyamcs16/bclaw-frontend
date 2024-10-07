import React, { ReactElement, useState } from "react";
import "./tooltip.css";

// Props interface for the Tooltip component
interface TooltipProps {
  children: ReactElement; // The element that triggers the tooltip
  tooltipText: string; // The text to display in the tooltip
  position?: "right" | "top" | "bottom" | "left"; // Optional position of the tooltip
}

// Tooltip component definition
const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltipText,
  position = "right", // Default position is right
}) => {
  // State to control tooltip visibility
  const [isVisible, setIsVisible] = useState(false);

  // Functions to show and hide the tooltip
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div 
      className="tooltip-trigger"
      onMouseEnter={showTooltip} // Show tooltip on mouse enter
      onMouseLeave={hideTooltip} // Hide tooltip on mouse leave
      onFocus={showTooltip} // Show tooltip on focus (for keyboard accessibility)
      onBlur={hideTooltip} // Hide tooltip on blur (for keyboard accessibility)
    >
      {/* Clone the child element and add accessibility attributes */}
      {React.cloneElement(children, {
        "aria-describedby": "tooltip", // Associates the tooltip with the trigger element
        tabIndex: 0, // Makes the element focusable
      })}
      {isVisible && (
        <div 
          id="tooltip"
          role="tooltip" // Accessibility role for screen readers
          className={`tooltip tooltip-${position}`} // Apply position-specific class
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;