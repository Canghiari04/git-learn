import "../css/footer.css";

export function Footer({content}) {
  return (
    <>
      <footer>
        <p>{content.footer} <a href="https://github.com/Canghiari04"><span>Matteo Canghiari</span></a></p>
      </footer>
    </>
  );
}