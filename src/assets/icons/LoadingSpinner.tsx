import classes from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      className="m-auto"
    >
      <circle
        cx="400"
        cy="400"
        fill="none"
        r="200"
        strokeWidth="40"
        stroke="#353C53"
        strokeDasharray="700 1400"
        strokeLinecap="round"
        className={classes.spin2}
      />
    </svg>
  );
};

export default LoadingSpinner;
