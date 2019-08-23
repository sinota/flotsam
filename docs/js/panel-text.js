
let panelOuterClass = 'uifloatpanel-outer';
let panelInnerClass = 'uifloatpanel-inner';


/**
 * const p = new FloatPanel()
 * p.setContent = document.createElement('input')
 * p.show()
 */
class FloatPanel {
    constructor (id) {
        this.initPanel();
        if (id) {
            this.panel.id = id;
        }
    }

    initPanel() {
        const p = document.createElement('div');
        p.style.cssText = `
            box-sizing: border-box;
            width: 90%;
            height: 300px;
            margin: 0;
            padding: 1em;
            position: fixed;
            /* top: 5%; */
            left: 5%;
            z-index: 99999;
            font-size: 10px;
            text-align: left;
            line-height: 1.2;
            font-family: sans-serif;
            color: #111111;
            background-color: #dddddd;
            border: 1px solid #000000;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
        `;
        p.classList.add(panelOuterClass);
        p.addEventListener('click', (evt) => {
            this.hide();
        });
        const c = document.createElement('div');
        c.classList.add(panelInnerClass);
        p.appendChild(c);
        this.panel = p;
        this.content = c;

        this.clickToClose = true;
    }

    /**
     * @param {HTMLElement} elm
     */
    setContent(elm) {
        this.content.innerHTML = '';
        this.content.appendChild(elm);
    }

    setPanelId(id) {
        this.panel.id = id;
    }

    show() {
        if (this.panel.parentElement === null) {
            this.put();
        }

        this.panel.classList.add('active');
    }

    hide() {
        this.panel.classList.remove('active');
        // this.panel.style.display = 'none';
    }

    put() {
        document.body.appendChild(this.panel);
    }
}


let panel, tpanel;

function showPanel() {
    const p = new FloatPanel();
    const cnt = document.createElement('p');
    cnt.innerHTML = 'Hello! <br> Click to close.';
    p.setContent(cnt);
    p.show();
    return p;
}

function makeTextPanel() {
    const p = new FloatPanel();
    const cnt = document.createElement('form');
    const ta = document.createElement('textarea');
    const btn = document.createElement('input');
    cnt.addEventListener('click', (evt) => {
        evt.stopPropagation();
    })
    ta.style.cssText = 'box-sizing:border-box;width:100%;height:10em;background-color:#fff;';
    btn.type = 'submit';
    btn.value = 'Execute';
    cnt.appendChild(ta);
    cnt.appendChild(btn);
    p.setContent(cnt);
    return p;
}

document.addEventListener('DOMContentLoaded', function(evt) {
    const btn = document.querySelector('#show-panel-btn');
    btn.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (panel) {
            panel.show();
        }
        else {
            panel = showPanel();
        }
    })

    const tbtn = document.querySelector('#show-text-panel-btn');
    tbtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (!tpanel) {
            tpanel = makeTextPanel();
        }
        tpanel.show();
    })
})



