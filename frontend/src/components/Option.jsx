import classes from "./Option.module.css";

function Option({ Icon, title, path, notifs, activeTab, ...props }) {
  return (
    <button
      className={`${classes.option} ${
        activeTab === path ? classes.optionSelected : ""
      }`}
      {...props}
    >
      <div className={classes.iconContainer}>
        <Icon />
      </div>
      <span className={classes.optionText}>{title}</span>
      {/* {notifs && <span className={classes.notification}>{notifs}</span>} */}
    </button>
  );
}

export default Option;
