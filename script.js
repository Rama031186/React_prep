const sections=[...document.querySelectorAll('.section')];
const progressBar=document.getElementById('progressBar');
const progressText=document.getElementById('progressText');
function updateProgress(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const pct=max>0?Math.min(100,Math.round(scrollY/max*100)):0;
  progressBar.style.width=pct+'%'; progressText.textContent=pct+'%';
}
addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

document.getElementById('search').addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase();
  document.querySelectorAll('#tocList li').forEach(li=>{
    li.hidden=!!q&&!li.textContent.toLowerCase().includes(q);
  });
  sections.forEach(section=>{
    section.hidden=!!q&&!section.textContent.toLowerCase().includes(q);
  });
});

document.querySelectorAll('.copy').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    const code=btn.closest('.code').querySelector('code').innerText;
    try{
      await navigator.clipboard.writeText(code);
      btn.textContent='COPIED';
      showToast('Code copied to clipboard');
    }catch{
      const area=document.createElement('textarea');area.value=code;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();
      btn.textContent='COPIED';showToast('Code copied to clipboard');
    }
    setTimeout(()=>btn.textContent='COPY',1500);
  });
});
function showToast(message){
  const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');
  clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),1800);
}
document.getElementById('themeToggle').addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('react-cheatsheet-theme',document.body.classList.contains('dark')?'dark':'light');
});
if(localStorage.getItem('react-cheatsheet-theme')==='dark')document.body.classList.add('dark');
