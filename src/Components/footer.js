 
function Footer() {
  var today = new Date();
  return (
    <div style={{textAlign: "center", height:"50px", background: "#fff", paddingTop: "16px", color: "#333",  borderTop: '1px solid #ccc'}}> 
    	Copyright {today.getFullYear()}
    </div>
  );
}

export default Footer;
