import React from 'react';
import { createRoot } from 'react-dom/client';
import OrbitWorks from './OrbitWorks.jsx';
import BorderGlow from './BorderGlow.jsx';
import GlareHover from './GlareHover.jsx';
import CustomCursor from './CustomCursor.jsx';
import ProfileCard from './ProfileCard.jsx';
import VideoPreview from './VideoPreview.jsx';
import HeroBackgroundVideo from './HeroBackgroundVideo.jsx';
import './style.css';

const email = '56697252@qq.com';
// 求职意向：暂不在首页展示，需要时可恢复为独立内容模块。
const jobIntent = {
  label: 'VIDEO / MOTION / AIGC',
  title: '让想象发生在画面里',
  roles: ['视频创意制作设计师', 'AE 动效创意', 'AIGC 设计师'],
};
const projects = [
  { n: '01', title: '快影特效视觉动态设计', en: 'KUAIYING / MOTION SYSTEM', type: '视觉设计 · 动态特效 · AI', year: '2026 — 至今', cls: 'project-ky', tag: 'DESIGN SYSTEM', heroText: 'KINETIC\nVISION', artwork: <><div className="orb orb-one"/><div className="orb orb-two"/><span className="visual-word">KINETIC<br/>VISION</span><span className="visual-corner">K · 01 / FRAMEWORK</span></> },
  { n: '02', title: '网易云新媒体短片《音乐之旅》', en: 'NETEASE CLOUD MUSIC / CONTENT', type: '策划 · 拍摄 · 后期', year: '2026', cls: 'project-music', tag: 'MUSIC / CULTURE', heroText: 'SOUND\nIN MOTION', video: 'https://video.kingswayvideo.com/115409967177711792793/ef6dded0be/1920_1080_0.mp4', poster: '/covers/music-video.jpg', artwork: <><div className="record"><div className="record-inner"/></div><span className="music-line">THE SOUND<br/>BETWEEN US.</span><span className="visual-corner">CLOUD MUSIC / 2026</span></> },
  { n: '03', title: '《小宇的画本》AI 视频短片', en: 'AI FILM / XIAO YU HUA BEN', type: '视频设计 · AI 生图', year: '2025', cls: 'project-ai', tag: 'AI CINEMA', heroText: 'A STORY\nIN FRAMES', video: 'https://video.kingswayvideo.com/115409967177711792793/22fd5550be/1280_720_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/22fd5550be/cover.jpg', artwork: <><div className="moon"/><div className="landscape layer-a"/><div className="landscape layer-b"/><span className="visual-corner">A STORY IN FRAMES / 2025</span></> },
  { n: '04', title: '《守夜人》剧情短片', en: 'NIGHT WATCH / SHORT FILM', type: '拍摄 · 剪辑 · 后期', year: '2025', cls: 'project-night', tag: 'SHORT FILM', heroText: 'AFTER\nDARK', video: 'https://video.kingswayvideo.com/115409967177711792793/093f2940be/1920_1080_0.mp4', poster: '/covers/shouyeren.jpg', artwork: <><div className="night-light"/><span className="visual-word">AFTER<br/>DARK</span><span className="visual-corner">NIGHT WATCH / 2025</span></> },
];
const abilities = [
  { n: '01', title: '创意策划', en: 'CREATIVE DIRECTION', text: '从洞察、概念到脚本与分镜，建立完整的视频表达。' },
  { n: '02', title: '动态设计', en: 'MOTION DESIGN', text: '使用 AE 构建节奏、转场与视觉特效，让画面更有记忆点。' },
  { n: '03', title: 'AIGC 工作流', en: 'AI PRODUCTION', text: '将生成式工具融入创意、视觉设计与视频制作流程。' },
  { n: '04', title: '全流程制作', en: 'END-TO-END', text: '覆盖拍摄、剪辑、调色与交付，兼顾创意和落地效率。' },
];
const experience = [
  { date: '2026.07 — 至今', company: '快手科技', location: '深圳', role: '视觉创意动态设计', description: '负责快影视频特效、转场、动画与包装方案；推动 AI 创意工具落地，结合素材表现与数据复盘优化视觉内容。' },
  { date: '2026.03 — 2026.07', company: '网易云音乐', location: '杭州', role: '视频策划与制作', description: '参与平台栏目与音乐内容的视频策划、脚本、采访拍摄和后期制作，协同团队完成从创意到发布的完整流程。' },
  { date: '2025.07 — 2025.09', company: '南康区人民政府', location: '赣州', role: '宣传实习生', description: '协同落地 3 场提振消费商圈活动，联动 12 家商户，线下覆盖客流 1.2 万+；搭建政务新媒体“选题 + AI 创作”SOP，账号整体互动量提升 35%；梳理物料设计、新媒体选题与线下活动全流程，减少同类活动的重复工作。' },
  { date: '2023.09 — 2024.06', company: '微宇宙有限公司', location: '无锡', role: '创意编导', description: '负责短视频从概念、脚本到成片的全流程制作，结合 AI 辅助分镜设计，完成拍摄、剪辑、调色与音效。' },
];
const workItems = [
  { n: '01', title: '快影效果动态设计', category: '动效设计', detail: '策划 / 特效制作', video: 'https://video.kingswayvideo.com/115409967177711792793/2f7d8f20be/1906_1080_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/2f7d8f20be/cover.jpg' },
  { n: '02', title: '网易云新媒体短片《音乐之旅》', category: '视频创意与制作', detail: '策划 / 拍摄 / 后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/ef6dded0be/1920_1080_0.mp4', poster: '/covers/music-video.jpg', previewAt: .52 },
  { n: '03', title: 'AI 视频宣传短片《小宇的画本》', category: 'AIGC', detail: '视频设计 / AI 生图', video: 'https://video.kingswayvideo.com/115409967177711792793/22fd5550be/1280_720_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/22fd5550be/cover.jpg' },
  { n: '04', title: '剧情短片《守夜人》', category: '视频创意与制作', detail: '拍摄 / 后期', video: 'https://video.kingswayvideo.com/115409967177711792793/093f2940be/1920_1080_0.mp4', poster: '/covers/shouyeren.jpg', previewAt: .55 },
  { n: '05', title: '说唱歌手吴嘉轩深度访谈', category: '视频创意与制作', detail: '策划 / 编导', video: 'https://video.kingswayvideo.com/115409967177711792793/f376e3f0be/480_360_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/f376e3f0be/cover.jpg' },
  { n: '06', title: '艺人汤令山深度采访', category: '视频创意与制作', detail: '拍摄 / 后期 / 编导', video: 'https://video.kingswayvideo.com/115409967177711792793/c5baab40be/1920_1080_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/c5baab40be/cover.jpg' },
  { n: '07', title: '豪杰君—抖音账号短视频', category: '视频创意与制作', detail: '后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/10345f90be/1280_720_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/10345f90be/cover.jpg' },
  { n: '08', title: '网易云音乐季草场音乐节', category: '视频创意与制作', detail: '策划 / 后期', video: 'https://video.kingswayvideo.com/115409967177711792793/2cc10730be/1280_720_0.mp4', poster: '/covers/caochangyyj.jpg' },
  { n: '09', title: '欧美艺人访谈', category: '视频创意与制作', detail: '后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/200dd680be/360_640_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/200dd680be/cover.jpg' },
  { n: '10', title: 'AI 游戏视频《冒险大作战》', category: 'AIGC', detail: '策划 / 后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/1c02ae80be/496_864_0.mp4', poster: '/covers/mailiangsp-v2.jpg', previewAt: .78 },
  { n: '11', title: '《云上叨叨》节目包装', category: '动效设计', detail: '动效设计', video: 'https://video.kingswayvideo.com/115409967177711792793/c5baab40be/1920_1080_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/c5baab40be/cover.jpg', previewSecond: 3 },
  { n: '12', title: '硬地原创音乐奖获奖视频', category: '动效设计', detail: '动效包装 / 后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/16bf54a0be/1280_720_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/16bf54a0be/cover.jpg', previewSecond: 3 },
  { n: '13', title: '中文说唱音乐奖获奖视频', category: '动效设计', detail: '动效设计', video: 'https://video.kingswayvideo.com/115409967177711792793/29eadcc0be/554_360_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/29eadcc0be/cover.jpg' },
  { n: '14', title: '《真心话》节目片头', category: '动效设计', detail: '动效包装', video: 'https://video.kingswayvideo.com/115409967177711792793/12fea320be/720_960_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/12fea320be/cover.jpg', previewSecond: 3 },
  { n: '15', title: '娃哈哈 MG 动画广告', category: '动效设计', detail: '动效设计 / 后期制作', video: 'https://video.kingswayvideo.com/115409967177711792793/197573f0be/1920_1080_0.mp4', poster: 'https://static.kingswayvideo.com/115409967177711792793/vod/197573f0be/cover.jpg', previewAt: .48 },
  { n: '16', title: '黄康作品混剪', category: '作品合集混剪', detail: '视频创意 / 动效设计 / AIGC', video: 'https://video.kingswayvideo.com/115409967177711792793/0af683f0be/1270_720_0.mp4', poster: '/covers/zphj.jpg' },
];
const workFilters = ['全部', '作品合集混剪', '视频创意与制作', '动效设计', 'AIGC'];
const heroProjects = workItems.map((item) => {
  const featured = projects.find((project) => project.n === item.n);
  return {
    ...featured,
    ...item,
    tag: item.category,
    heroText: featured?.heroText || `WORK\n${item.n}`,
  };
});
function Arrow({diagonal=false}) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span> }
function SiteHeader({ floating = false, activeSection = 'top' }) {
  return <header className={floating ? 'site-header floating-header' : 'site-header shell'}>
    <a className="brand" href="/" aria-label="黄康，返回首页">HK<span className="brand-dot">.</span><small>HUANG KANG</small></a>
    <nav aria-label={floating ? '悬浮导航' : '主导航'}><a className={activeSection === 'projects' ? 'is-active' : ''} href="/portfolio#projects">精选作品</a><a className={activeSection === 'about' ? 'is-active' : ''} href="/portfolio#about">关于我</a><a className={activeSection === 'strengths' ? 'is-active' : ''} href="/portfolio#strengths">个人优势</a></nav>
    <a className={`header-contact${activeSection === 'contact' ? ' is-active' : ''}`} href="/portfolio#contact">联系我 <Arrow diagonal/></a>
  </header>;
}
function App(){
  const pagePath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isHome = pagePath !== '/portfolio';
  React.useLayoutEffect(() => {
    if (!isHome) document.getElementById(window.location.hash.slice(1) || 'projects')?.scrollIntoView({behavior: 'instant'});
  }, [isHome]);
  const [workFilter, setWorkFilter] = React.useState('全部');
  const [selectedWork, setSelectedWork] = React.useState(null);
  const [hasVideoStarted, setHasVideoStarted] = React.useState(false);
  const modalVideoRef = React.useRef(null);
  const [showFloatingHeader, setShowFloatingHeader] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('top');
  const visibleWorks = workFilter === '全部' ? workItems : workItems.filter(item => item.category === workFilter);
  const playableWorks = workItems.filter(item => item.video);
  const selectedWorkIndex = selectedWork ? playableWorks.findIndex(item => item.n === selectedWork.n) : -1;
  const selectRelativeWork = (offset) => {
    const nextIndex = selectedWorkIndex + offset;
    if (nextIndex >= 0 && nextIndex < playableWorks.length) setSelectedWork(playableWorks[nextIndex]);
  };
  React.useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const hero = document.getElementById('top');
      setShowFloatingHeader(!isHome || Boolean(hero && hero.getBoundingClientRect().bottom <= 105));
      const marker = window.scrollY + window.innerHeight * .38;
      let current = 'top';
      ['projects','about','strengths','contact'].forEach(id => { const section = document.getElementById(id); if (section && section.offsetTop <= marker) current = id; });
      setActiveSection(current);
    };
    const scheduleUpdate = () => { if (frame === null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => { if (frame !== null) cancelAnimationFrame(frame); window.removeEventListener('scroll', scheduleUpdate); window.removeEventListener('resize', scheduleUpdate); };
  }, []);
  React.useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedWork(null); };
    setHasVideoStarted(false);
    document.body.style.overflowY = selectedWork ? 'hidden' : '';
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflowY = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [selectedWork]);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    document.body.classList.add('motion-ready');
    const sections = [...document.querySelectorAll('.reveal-section')];
    sections.forEach(section => section.querySelectorAll('.work-tile,.experience-item,.ability').forEach((item, index) => { item.style.setProperty('--stagger', index); item.style.setProperty('--stagger-local', index % 5); }));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-inview'); observer.unobserve(entry.target); }
    }), { threshold: .01, rootMargin: '0px 0px -24% 0px' });
    sections.forEach(section => observer.observe(section));
    const revealItems = [...document.querySelectorAll('.work-tile,.experience-item,.ability')];
    const itemObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-item-inview'); itemObserver.unobserve(entry.target); }
    }), { threshold: .16, rootMargin: '0px 0px -7% 0px' });
    revealItems.forEach(item => itemObserver.observe(item));
    return () => { observer.disconnect(); itemObserver.disconnect(); document.body.classList.remove('motion-ready'); };
  }, [workFilter]);
  return <main className={isHome ? 'home-page' : 'portfolio-page'}>
    <CustomCursor/>
    <div className="opening-screen" aria-hidden="true"><span className="opening-line opening-line-a"/><div className="opening-word"><span>HUANG KANG</span><small>CREATIVE PORTFOLIO · 2026</small></div><span className="opening-line opening-line-b"/></div>
    {isHome && <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true"><HeroBackgroundVideo/><div className="hero-art"><span className="halo halo-a"/><span className="halo halo-b"/><span className="grid-plane"/></div></div>
      <div className="hero-shade"/>
      <SiteHeader activeSection={activeSection}/>
      <OrbitWorks projects={heroProjects} onSelect={setSelectedWork}/>
      <div className="hero-rail shell"><span>HUANG KANG / SELECTED WORKS</span><a href="/portfolio#projects">浏览全部作品 ↗</a></div>
    </section>}
    {!isHome && <>
    {showFloatingHeader && <SiteHeader floating activeSection={activeSection}/>} 
    <section className="projects section reveal-section" id="projects"><div className="shell"><div className="works-eyebrow">01 / THE WORK / 作品</div><div className="works-heading"><h2>Selected works<span>.</span></h2><p>创意、影像与动态视觉的不同表达。</p></div><div className="works-toolbar"><div className="works-filters" aria-label="作品分类">{workFilters.map(filter => <button type="button" key={filter} className={workFilter === filter ? 'is-active' : ''} onClick={() => setWorkFilter(filter)} aria-pressed={workFilter === filter}>{filter}</button>)}</div><span className="works-count">{String(visibleWorks.length).padStart(2,'0')} / {String(workItems.length).padStart(2,'0')}</span></div><div className="works-grid">{visibleWorks.map(item => <article className={`work-tile ${item.video ? 'has-video' : ''}`} id={`work-${item.n}`} key={item.n} role={item.video ? 'button' : undefined} tabIndex={item.video ? 0 : undefined} onClick={() => item.video && setSelectedWork(item)} onKeyDown={(event) => { if (item.video && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setSelectedWork(item); } }}><GlareHover className="work-glare" width="100%" height="auto" background="#142322" borderRadius="0px" borderColor="#2b3432" glareColor="#94a3b8" glareOpacity={.6} glareAngle={-30} glareSize={300} transitionDuration={500} playOnce><div className={`work-cover ${item.video || item.image ? '' : 'work-cover-empty'}`} role="img" aria-label={item.video ? `${item.title}的视频预览` : item.image ? `${item.title}的封面` : `${item.title}，封面待加入`}>{item.video ? <><VideoPreview poster={item.poster} src={item.video} previewAt={item.previewAt} previewSecond={item.previewSecond}/><span className="work-play" aria-hidden="true">▶</span></> : item.image ? <img src={item.image} alt="" /> : <><span className="work-cover-index">HK / SELECTED WORK</span><span className="work-cover-number" aria-hidden="true">{item.n}</span><span className="work-cover-category">{item.category}</span></>}</div></GlareHover><div className="work-tile-meta"><h3>{item.title}</h3><span aria-hidden="true">↗</span></div><p>{item.category} / {item.detail}</p></article>)}</div></div></section>
    <section className="about section shell reveal-section" id="about"><div className="section-kicker"><span>02 / ABOUT</span><span>关于我</span></div><div className="about-grid"><ProfileCard className="portrait" avatarUrl="/designer-avatar.webp" name="黄康" title="VIDEO · MOTION · AIGC"/><BorderGlow className="about-glow-card"><div className="about-content"><div className="overline">VIDEO · MOTION · AIGC</div><h2>你好，我是<span>黄康。</span></h2><p className="about-lead">一名持续探索影像叙事与动态视觉的创作者。</p><p className="about-copy">赣南师范大学戏剧与影视硕士在读。曾在快手负责视觉创意动态设计，在网易云音乐参与全平台视频内容策划与制作。我关注创意如何被清晰表达，也关注新工具如何打开更自由的视觉可能。</p><div className="about-service"><small>服务方向</small><strong>视频制作 / 创意动效 / AIGC</strong></div><div className="about-stats"><div><strong>35<span>%</span></strong><small>AI 工作流效率提升</small></div><div><strong>1000<span>+</span></strong><small>快影新增会员 / 周</small></div><div><strong>25<span>+</span></strong><small>设计与创意奖项</small></div></div><div className="about-links"><a href={'mailto:'+email}>{email} <Arrow diagonal/></a><a href="tel:13907075842">139 0707 5842 <Arrow diagonal/></a></div></div></BorderGlow></div><div className="experience" id="experience"><div className="experience-heading"><span>CAREER PATH / 个人经历</span><h3>工作经历<span className="experience-spark">✳</span></h3></div><div className="experience-grid">{experience.map((item, index) => <article className="experience-item" key={item.date}><span className="experience-node" aria-hidden="true">✦</span><div className="experience-index">0{index + 1} / 0{experience.length}</div><time>{item.date}</time><h4>{item.company}</h4><div className="experience-tags"><span>{item.role}</span><span>{item.location}</span></div><p>{item.description}</p></article>)}</div></div></section>
    <section className="strengths section shell reveal-section" id="strengths"><div className="section-kicker"><span>03 / CAPABILITIES</span><span>个人优势</span></div><div className="strength-head"><h2>从一个想法，<br/>到一支<span>完整的作品。</span></h2><p>以内容为起点，以视觉为语言。<br/>让技术服务于表达。</p></div><div className="ability-grid">{abilities.map(a=><div className="ability" key={a.n}><span className="ability-no">{a.n} / 04</span><div className="ability-symbol" aria-hidden="true">{a.n==='01'?'✳':a.n==='02'?'◎':a.n==='03'?'✦':'↗'}</div><div><small>{a.en}</small><h3>{a.title}</h3><p>{a.text}</p></div></div>)}</div></section>
    <footer className="contact reveal-section" id="contact"><div className="contact-glow"/><div className="shell contact-inner"><div className="section-kicker"><span>04 / CONTACT</span><span>保持联系</span></div><div className="contact-main"><div className="contact-statement"><p>联系方式</p><h2>LET’S CREATE<br/>SOMETHING<br/><em>MEMORABLE.</em> <span>↘</span></h2><a className="contact-button" href={'mailto:'+email}>HK. HUANG KANG</a></div><aside className="contact-card"><span className="contact-card-label">CONTACT</span><a href="tel:13907075842"><small>PHONE</small><strong>+86 139 0707 5842</strong></a><div className="contact-direction"><small>WECHAT</small><strong>139 0707 5842</strong></div><a href={'mailto:'+email}><small>EMAIL</small><strong>{email}</strong></a><div className="contact-direction"><small>FOCUS</small><strong>VIDEO · MOTION · AIGC</strong></div><a className="contact-card-cta" href={'mailto:'+email}>发起合作 <Arrow diagonal/></a></aside></div><div className="contact-bottom"><span>© 2026 HUANG KANG</span><span>VIDEO CREATIVE / MOTION / AIGC</span><a href="/">返回首页 ↗</a></div></div></footer>
    </> }
    {selectedWork && <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${selectedWork.title}视频播放`} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedWork(null); }}><div className="video-modal-panel"><button className="video-modal-close" type="button" onClick={() => setSelectedWork(null)} aria-label="关闭视频">×</button><div className="video-modal-media"><video ref={modalVideoRef} key={selectedWork.video} src={selectedWork.video} poster={selectedWork.poster} controls={hasVideoStarted} playsInline onPlay={() => setHasVideoStarted(true)}/>{!hasVideoStarted && <button className="video-modal-play" type="button" onClick={() => modalVideoRef.current?.play()}><span aria-hidden="true">▶</span>观看作品</button>}</div><div className="video-modal-info"><div className="video-modal-copy"><span>{selectedWork.category} · {selectedWork.detail}</span><h2>{selectedWork.title}</h2></div><div className="video-modal-actions"><span>{String(selectedWorkIndex + 1).padStart(2,'0')} / {String(playableWorks.length).padStart(2,'0')}</span><button type="button" onClick={() => selectRelativeWork(-1)} disabled={selectedWorkIndex <= 0} aria-label="上一个视频">←</button><button type="button" onClick={() => selectRelativeWork(1)} disabled={selectedWorkIndex >= playableWorks.length - 1} aria-label="下一个视频">→</button></div></div></div></div>}
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);















