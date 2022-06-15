import Navigation from "./Navigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
