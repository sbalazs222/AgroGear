function Aboutus() {
  return (
    <>
      <header className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="mb-4">About Us</h1>
            <p className="lead">
              Az AgroGear azért jött létre, hogy a modern mezőgazdaság szereplőinek
              megbízható és hatékony gépeket biztosítson.
            </p>
          </div>
        </div>
      </header>

      <section className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-3">Küldetésünk</h2>
            <p>
              Hiszünk abban, hogy a föld nem csupán munkaeszköz, hanem örökség és
              felelősség is. Olyan megoldásokat kínálunk, amelyek hosszú távon
              támogatják a gazdálkodók sikerét.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-3">Mit kínálunk?</h2>
            <ul className="ps-3">
              <li>Talajművelő gépek</li>
              <li>Vetéshez szükséges eszközök</li>
              <li>Növényápolási megoldások</li>
              <li>Betakarítási gépek</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container py-4 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-3">Miért az AgroGear?</h2>
            <p>
              Nem csupán webáruház vagyunk - partnerként támogatjuk ügyfeleinket
              szakmai tanácsadással, gyors kiszolgálással és megbízható
              termékekkel.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;