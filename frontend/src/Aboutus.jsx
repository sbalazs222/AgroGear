function Aboutus() {
  const calculateAge = (year, month, day) => {
    const birth = new Date(year, month - 1, day);
    const diff = new Date() - birth;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <div>
      <div className="py-5 text-white" style={{ background: "linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)", borderRadius: "0 0 100px 100px", marginBottom: "50px" }}>
        <div className="container text-center py-4">
          <h1 className="display-3 fw-bold">Rólunk</h1>
          <p className="lead opacity-75">Az AgroGear a jövő mezőgazdaságának partnere.</p>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-5 text-center px-4">
            <div className="p-4 bg-white shadow-sm agro-card">
              <div className="rounded-circle bg-success text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: "80px", height: "80px", fontSize: "2rem"}}>B</div>
              <h3>Bence</h3>
              <p className="badge bg-success fs-6">{calculateAge(2006, 10, 5)} éves</p>
              <p className="text-muted">Alapító, Gépészeti szakértő</p>
            </div>
          </div>
          <div className="col-md-5 text-center px-4">
            <div className="p-4 bg-white shadow-sm agro-card">
              <div className="rounded-circle bg-success text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: "80px", height: "80px", fontSize: "2rem"}}>B</div>
              <h3>Balázs</h3>
              <p className="badge bg-success fs-6">{calculateAge(2006, 5, 10)} éves</p>
              <p className="text-muted">Alapító, Logisztikai vezető</p>
            </div>
          </div>
        </div>

        <div className="row py-5 align-items-center">
          <div className="col-lg-6">
            <h2 className="display-5 fw-bold text-success mb-4">Küldetésünk</h2>
            <p className="fs-5">Hiszünk abban, hogy a föld nem csupán munkaeszköz, hanem örökség és felelősség is. Olyan megoldásokat kínálunk, amelyek hosszú távon támogatják a gazdálkodók sikerét.</p>
          </div>
          <div className="col-lg-6">
             <div className="p-4 bg-light rounded-4 border-start border-success border-5">
               <h4>Mit kínálunk?</h4>
               <ul className="list-unstyled fs-5 mt-3">
                 <li>✅ Talajművelő gépek</li>
                 <li>✅ Modern öntözéstechnika</li>
                 <li>✅ Precíziós vetőgépek</li>
                 <li>✅ 24/7 szakmai tanácsadás</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Aboutus;