import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">COSC 4351 - G29</span>
        <span className="headerTitleLg">STEAK HOUSE</span>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1558030006-450675393462?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RlYWt8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        alt=""
      />
    </div>
  );
}
