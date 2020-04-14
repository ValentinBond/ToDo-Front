import React from 'react';
import Slide from '@material-ui/core/Slide';

export default React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});