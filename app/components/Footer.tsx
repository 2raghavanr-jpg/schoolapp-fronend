export default function Footer() {
  return (
    <footer className="footer-wrapper footer-default footer-overlay" data-bg-src="assets/img/bg/footer-bg-1.jpg">

        <div className="copyright-wrap z-index-common">
            <div className="container">
                <div className="row justify-content-center gy-3 align-items-center">
                    <div className="col-lg-6">
                        <p className="copyright-text">
                            <i className="fal fa-copyright"></i> Copyright 2026
                            <a href="">Rankridge</a>. All Rights Reserved.
                        </p>
                    </div>
                    <div className="col-lg-6 text-lg-end text-center">
                        <div className="footer-links">
                            <ul>
                                <li><a href="/p/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/p/terms-of-services">Terms of services</a></li>
                                <li><a href="/p/disclaimer">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
