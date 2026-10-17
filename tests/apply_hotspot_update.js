const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const decorSvg = `              <div class="card_decor">
                <div data-wf--decor--variant="med" class="decor">
                  <div class="frame_l-tb w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="50%" y1="0%" x2="50%" y2="100%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_lt w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="100%" x2="100%" y2="0%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_t-lr w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="50%" x2="100%" y2="50%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_rt w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="0%" x2="100%" y2="100%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_r-tb w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="50%" y1="0%" x2="50%" y2="100%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_rb w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="100%" x2="100%" y2="0%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_b-lr w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="50%" x2="100%" y2="50%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                  <div class="frame_lb w-variant-db77920b-274b-9558-1ced-34e87f5b7d94 w-embed"><svg width="100%"
                      height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0%" y1="0%" x2="100%" y2="100%" stroke-width="1" stroke="currentColor"
                        vector-effect="non-scaling-stroke"></line>
                    </svg></div>
                </div>
              </div>`;

const closeBtnSvg = `<div data-modal-close="" hover-btn="" class="btn-ico modal-tip-close_btn" aria-label="Close card">
                    <a aria-label="Close" href="#" class="btn-ico_link w-inline-block"></a>
                    <div hover="ico" class="btn_ico">
                      <div class="ico-16">
                        <div class="ico w-embed"><svg width="100%" height="100%" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M11.5292 3.52827C11.7896 3.26792 12.2123 3.26792 12.4726 3.52827C12.733 3.78862 12.733 4.21128 12.4726 4.47163L8.94429 7.99995L12.4726 11.5283C12.733 11.7886 12.733 12.2113 12.4726 12.4716C12.2123 12.732 11.7896 12.732 11.5292 12.4716L8.00093 8.94331L4.47261 12.4716C4.21226 12.732 3.7896 12.732 3.52925 12.4716C3.2689 12.2113 3.2689 11.7886 3.52925 11.5283L7.05757 7.99995L3.52925 4.47163C3.2689 4.21128 3.2689 3.78862 3.52925 3.52827C3.7896 3.26792 4.21226 3.26792 4.47261 3.52827L8.00093 7.05659L11.5292 3.52827Z"
                              fill="currentColor"></path>
                          </svg></div>
                      </div>
                    </div>
                    <div class="btn_bg">
                      <div hover="bg" class="btn_bg_fill"></div>
                    </div>
                  </div>`;

const newFloatingAndModals = `      <div class="floating-tips w-dyn-list">
        <div role="list" class="floating-tips_list w-dyn-items">
          <div floating-tip="crafted-to-endure" role="listitem" class="floating-tip w-dyn-item">
            <div class="floating-tip-card">
              <div class="floating-tip-card_t">
                <h1 class="h5">Handcrafted Grandeur</h1>
              </div>
              <div class="floating-tip-card_img-w">
                <img src="/assets/narayanam/facilities/hotel-front-view.jpg" alt="Handcrafted Grandeur" class="floating-tip-card_img" loading="eager" />
              </div>
              <div class="floating-tip-card_b">
                <p class="p1">Natural Italian marble, intricate brass accents, and soaring arched ceilings crafted to endure through generations.</p>
              </div>
${decorSvg}
            </div>
          </div>
          <div floating-tip="light-flow" role="listitem" class="floating-tip w-dyn-item">
            <div class="floating-tip-card">
              <div class="floating-tip-card_t">
                <h1 class="h5">Naivedyam Pure Veg</h1>
              </div>
              <div class="floating-tip-card_img-w">
                <img src="/assets/narayanam/dining/naivedyam-restaurant.jpg" alt="Naivedyam Pure Veg Fine Dining" class="floating-tip-card_img" loading="eager" />
              </div>
              <div class="floating-tip-card_b">
                <p class="p1">Fine dining restaurant serving exquisite vegetarian culinary creations crafted by master chefs.</p>
              </div>
${decorSvg}
            </div>
          </div>
          <div floating-tip="your-private-sanctuary" role="listitem" class="floating-tip w-dyn-item">
            <div class="floating-tip-card">
              <div class="floating-tip-card_t">
                <h1 class="h5">Royal Suites &amp; Rooms</h1>
              </div>
              <div class="floating-tip-card_img-w">
                <img src="/assets/narayanam/rooms/royal-suite.jpg" alt="Royal Suites &amp; Rooms" class="floating-tip-card_img" loading="eager" />
              </div>
              <div class="floating-tip-card_b">
                <p class="p1">Luxurious sanctuary with bespoke furnishings, plush bedding, private jacuzzi, and world-class hospitality for an unforgettable stay.</p>
              </div>
${decorSvg}
            </div>
          </div>
        </div>
      </div>
      <div class="floating-tips w-dyn-list">
        <div class="cms_empty-none w-dyn-empty"></div>
      </div>
      <div class="modal show w-dyn-list">
        <!-- Hotspot 1 Modal Card: Crafted to Endure (Amenities / Architecture) -->
        <div data-modal-tip="crafted-to-endure" class="modal theme_on-brand" style="display: none;">
          <div class="modal_c">
            <div data-modal-container="" class="moda_tip theme_on-brand">
              <div class="floating-tip-card modal-tip-card">
                <div class="modal-tip-card_header">
                  <div class="floating-tip-card_t">
                    <h2 class="h5">Handcrafted Grandeur</h2>
                  </div>
                  ${closeBtnSvg}
                </div>
                <div class="floating-tip-card_img-w">
                  <img src="/assets/narayanam/facilities/hotel-front-view.jpg" alt="Handcrafted Grandeur" class="floating-tip-card_img" loading="eager" />
                </div>
                <div class="floating-tip-card_b">
                  <p class="p1">Natural Italian marble, intricate brass accents, and soaring arched ceilings crafted to endure through generations.</p>
                </div>
${decorSvg}
              </div>
            </div>
            <div data-modal-close="" data-modal-over="" class="modal_over"></div>
          </div>
        </div>

        <!-- Hotspot 2 Modal Card: Light & Flow (Dining) -->
        <div data-modal-tip="light-flow" class="modal theme_on-brand" style="display: none;">
          <div class="modal_c">
            <div data-modal-container="" class="moda_tip theme_on-brand">
              <div class="floating-tip-card modal-tip-card">
                <div class="modal-tip-card_header">
                  <div class="floating-tip-card_t">
                    <h2 class="h5">Naivedyam Pure Veg</h2>
                  </div>
                  ${closeBtnSvg}
                </div>
                <div class="floating-tip-card_img-w">
                  <img src="/assets/narayanam/dining/naivedyam-restaurant.jpg" alt="Naivedyam Pure Veg" class="floating-tip-card_img" loading="eager" />
                </div>
                <div class="floating-tip-card_b">
                  <p class="p1">Fine dining restaurant serving exquisite vegetarian culinary creations crafted by master chefs.</p>
                </div>
${decorSvg}
              </div>
            </div>
            <div data-modal-close="" data-modal-over="" class="modal_over"></div>
          </div>
        </div>

        <!-- Hotspot 3 Modal Card: Your Private Sanctuary (Room / Suites) -->
        <div data-modal-tip="your-private-sanctuary" class="modal theme_on-brand" style="display: none;">
          <div class="modal_c">
            <div data-modal-container="" class="moda_tip theme_on-brand">
              <div class="floating-tip-card modal-tip-card">
                <div class="modal-tip-card_header">
                  <div class="floating-tip-card_t">
                    <h2 class="h5">Royal Suites &amp; Rooms</h2>
                  </div>
                  ${closeBtnSvg}
                </div>
                <div class="floating-tip-card_img-w">
                  <img src="/assets/narayanam/rooms/royal-suite.jpg" alt="Royal Suites &amp; Rooms" class="floating-tip-card_img" loading="eager" />
                </div>
                <div class="floating-tip-card_b">
                  <p class="p1">Luxurious sanctuary with bespoke furnishings, plush bedding, private jacuzzi, and world-class hospitality for an unforgettable stay.</p>
                </div>
${decorSvg}
              </div>
            </div>
            <div data-modal-close="" data-modal-over="" class="modal_over"></div>
          </div>
        </div>
      </div>`;

const targetStart = content.indexOf('<div class="floating-tips w-dyn-list">');
const targetEnd = content.indexOf('</main>', targetStart);

if (targetStart === -1 || targetEnd === -1) {
  console.error('Could not find target tags in index.html');
  process.exit(1);
}

content = content.slice(0, targetStart) + newFloatingAndModals + '\n    ' + content.slice(targetEnd);
fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully updated index.html with floating tips and modal hotspot cards!');
