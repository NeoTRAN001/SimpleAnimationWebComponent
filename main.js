// Custom Functions

function change() {
    let animationElements = document.querySelector('.animation-elements');

    if(animationElements.getAttribute('animation') == 'topdown')
        animationElements.setAttribute('animation', 'slidein');
    else
        animationElements.setAttribute('animation', 'topdown');
}

// Web Components

class AnimationElements extends HTMLElement {
    constructor() {
        super();
        this.animation = "slidein";
    }

    connectedCallback() {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
                <style>
                :host { 
                    background: white ; 
                    display: inline-block; 
                    width: 100%;
                    height: 100%;
                    animation-duration: 3s;
                    animation-name: slidein;
                    animation-iteration-count: infinite;
                    animation-direction: alternate;
                } 
 
                ::slotted([slot=square-figure]) { 
                    padding: 5px;
                }

                ::slotted([slot=circle-figure]) { 
                    padding: 5px;
                } 

                @keyframes slidein {
                    from {
                      margin-left: 100%;
                      width: 300%
                    }
                  
                    to {
                      margin-left: 0%;
                      width: 100%;
                    }
                }

                @keyframes topdown {
                    from {
                        margin-top: 100%;
                        height: 300%
                    }
                          
                    to {
                        margin-bottom: 0%;
                        height: 100%;
                    }
                }
                </style>

                <slot id="slot1" name="square-figure"></slot> 
                <slot id="slot2" name="circle-figure"></slot> 
        `;
        
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }

    attributeChangedCallback(attribute, lastValue, newValue) {
        this.animation = newValue;
        
        if(this.animation == "topdown") this.shadowRoot.host.style = "animation-name: topdown;";
        else if(this.animation == "slidein") this.removeAttribute('style');
        
    }
      
    static get observedAttributes() {
        return ['animation'];
    }
}

class SquareFigure extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
                <style>
                    .square {
                                width: 100px; 
                                height: 100px; 
                                border: 3px solid #555;
                                background: #428bca;
                    }
                </style>

                <div class="square"></div>     
        `;
        
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}

class CircleFigure extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
                <style>
                    .circle {
                        width: 100px;
                        height: 100px;
                        -moz-border-radius: 50%;
                        -webkit-border-radius: 50%;
                        border-radius: 50%;
                        border: 3px solid #555;
                        background: #5cb85c;
                    }
                </style>

                <div class="circle"></div>     
        `;
        
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}

class ButtonAbsolute extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
                <style>
                    button {
                        position: absolute;
                        top: 35em;
                        left: 20em;
                        height: 45px;
                    }
                </style>

                <button onclick="change()">Cambiar Dirección</button>     
        `;
        
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
}


customElements.define('animation-elements', AnimationElements);
customElements.define('square-figure',      SquareFigure);
customElements.define('circle-figure',      CircleFigure);
customElements.define('button-absolute',    ButtonAbsolute);