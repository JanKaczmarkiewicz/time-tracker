import TimelineSvg from "../assets/timeline-background.svg";
import styled from "styled-components";
import colors from "../theme/color";

const TimelineWrapper = styled.div`
  padding: 32px;
  border: 1px solid ${colors.gray};
  border-radius: 20px;
`;

const Timeline = () => {
  return (
    <TimelineWrapper>
      <img src={TimelineSvg} alt="timeline" />
    </TimelineWrapper>
  );
};

export default Timeline;
