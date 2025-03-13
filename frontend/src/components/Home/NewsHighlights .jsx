import classes from "./NewsHighlights.module.css";

const news = [
  {
    title: "Lions Win Championship!",
    image: "../../src/assets/images/image1.jpg",
    description:
      "The Lions secured their championship title after a stunning 3-1 victory over the Tigers.",
    date: "Mar 12, 2025",
  },
  {
    title: "Star Player Breaks Goal Record",
    image: "../../src/assets/images/image2.jpg",
    description:
      "John Doe from the Eagles has set a new league record with 25 goals this season.",
    date: "Mar 10, 2025",
  },
  {
    title: "Upcoming Tournament Announced",
    image: "../../src/assets/images/image3.jpg",
    description:
      "The highly anticipated summer tournament is set to begin in June with top teams competing.",
    date: "Mar 8, 2025",
  },
  {
    title: "Lions Win Championship!",
    image: "../../src/assets/images/image1.jpg",
    description:
      "The Lions secured their championship title after a stunning 3-1 victory over the Tigers.",
    date: "Mar 12, 2025",
  },
  {
    title: "Star Player Breaks Goal Record",
    image: "../../src/assets/images/image2.jpg",
    description:
      "John Doe from the Eagles has set a new league record with 25 goals this season.",
    date: "Mar 10, 2025",
  },
  {
    title: "Upcoming Tournament Announced",
    image: "../../src/assets/images/image3.jpg",
    description:
      "The highly anticipated summer tournament is set to begin in June with top teams competing.",
    date: "Mar 8, 2025",
  },
];

function NewsHighlights() {
  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>📰 News & Highlights</h2>
      <div className={classes.newsGrid}>
        {news.map((article, index) => (
          <div key={index} className={classes.card}>
            <img
              src={article.image}
              alt={article.title}
              className={classes.image}
            />
            <div className={classes.content}>
              <h3 className={classes.title}>{article.title}</h3>
              <p className={classes.date}>{article.date}</p>
              <p className={classes.description}>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsHighlights;
