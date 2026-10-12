/* ---------- copy buttons on every code block ---------- */
document.querySelectorAll('pre').forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
        const codeEl = pre.querySelector('code');
        const text = codeEl ? codeEl.innerText : pre.innerText;
        try {
            await navigator.clipboard.writeText(text);
        } catch (_) {
            // clipboard API needs https or localhost; fall back to a temp textarea
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (_) { }
            ta.remove();
        }
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });
    pre.appendChild(btn);
});

/* ---------- interactive path -> URL builder ---------- */
const P = document.getElementById('bProject');
const B = document.getElementById('bBucket');
const PA = document.getElementById('bPath');
const OUT = document.getElementById('builtUrl');
const PREV = document.getElementById('bPreview');
const STAT = document.getElementById('bStatus');

// Sensible starting values so the preview works immediately.
P.value = 'https://decwucuwqnzrxzbxxifu.supabase.co';
B.value = 'images';
PA.value = '7dc34689-e05f-4f1d-8346-633985f339c8-moonface.png';

function build() {
    const project = P.value.trim().replace(/\/+$/, '');
    const bucket = B.value.trim().replace(/^\/+|\/+$/g, '');
    const path = PA.value.trim().replace(/^\/+/, '');

    if (!project || !bucket || !path) {
        OUT.value = '';
        PREV.removeAttribute('src');
        STAT.textContent = 'Fill in all three boxes to build a URL.';
        return;
    }

    const url = project + '/storage/v1/object/public/' + bucket + '/' + path;
    OUT.value = url;

    if (PREV.getAttribute('src') !== url) {
        STAT.textContent = 'Loading\u2026';
        STAT.className = 'lbl';
        PREV.src = url;
    }
}

PREV.addEventListener('load', () => {
    STAT.textContent = 'Loaded \u2713  this is the real image';
    STAT.className = 'lbl';
});
PREV.addEventListener('error', () => {
    STAT.textContent = 'Broken \u2717  check the project URL, bucket, and path';
    STAT.className = 'fail';
});

[P, B, PA].forEach((el) => el.addEventListener('input', build));

document.getElementById('bCopy').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    try { await navigator.clipboard.writeText(OUT.value); } catch (_) { OUT.select(); }
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy URL'; }, 1500);
});

build();