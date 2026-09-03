function NoticeCard({ notice, onOpen }) {
  return (
    <div className="notice-card" onClick={() => onOpen(notice)}>
      <div className="notice-top">

        <div className="notice-left">
          {notice.isNew && <span className="new-badge">NEW</span>}

          <span className="notice-category">
            {notice.category}
          </span>
        </div>

        <span className="notice-date">
          {notice.date}
        </span>

      </div>

      <h3>{notice.title}</h3>

      <p>{notice.description.substring(0, 80)}...</p>

      <div className="notice-bottom">

        <span className="notice-views">
          👁 {notice.views} Views
        </span>

        <button className="read-more-btn">
          Read More →
        </button>

      </div>
    </div>
  );
}

export default NoticeCard;