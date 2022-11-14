import { CSSTransition } from 'react-transition-group';

interface Props {
  content: string | React.ReactNode;
  inProp: boolean;
};

const AnimatedText: React.FC<Props> = ({
  content,
  inProp,
}) => (
  <CSSTransition
    in={inProp}
    timeout={500}
    classNames="textanimation"
    unmountOnExit
  >
    <span style={{ fontSize: '1.3em' }}>
      {content}
    </span>
  </CSSTransition>
);
export default AnimatedText;
