// Contacts tablet version from Figma frame 366:6053 (Tablet, 768x787).
export const kontaktyTabletH = 787;

const label = (top: number, text: string, w: number) => `
<div style="position:absolute;left:429px;top:${top}px;width:${w}px;height:12px;color:#1C1C1C;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:13.45px;font-weight:400;line-height:86%;letter-spacing:-0.67px;white-space:nowrap">${text}</div>`;

const line = (top: number) => `
<div style="position:absolute;left:429px;top:${top}px;width:299.12px;height:0;border-bottom:1.07px solid #9A9895"></div>`;

const social = (left: number, src: string, size = 25.2, icon = 16) => `
<div style="position:absolute;left:${left}px;top:727px;width:${size}px;height:${size}px;border-radius:50%;background:#1C1C1C;display:flex;align-items:center;justify-content:center">
  <img src="${src}" style="width:${icon}px;height:${icon}px;object-fit:contain" alt="" />
</div>`;

export const kontaktyTabletHtml = `<div data-contact-variant="tablet" style="position:absolute;left:0;top:0;width:768px;height:787px;background:#FFF;overflow:visible">
<img src="/blk/kontakty/wm_i.png" style="position:absolute;left:6px;top:67.88px;width:15.01px;height:93.02px;filter:drop-shadow(0 2.13px 2.13px rgba(0,0,0,.25))" alt="" />
<img src="/blk/kontakty/wm_am.png" style="position:absolute;left:53.54px;top:67.88px;width:187.81px;height:93.02px;filter:drop-shadow(0 2.13px 2.13px rgba(0,0,0,.25))" alt="" />
<img src="/blk/kontakty/wm_agency.png" style="position:absolute;left:277.88px;top:62px;width:484.09px;height:99.32px;filter:drop-shadow(0 2.13px 2.13px rgba(0,0,0,.25))" alt="I AM AGENCY" />
<div style="position:absolute;left:40px;top:286px;width:311px;height:96px;color:#1C1C1C;font-family:Coolvetica,-apple-system,Roboto,Helvetica,sans-serif;font-size:55.4px;font-weight:400;line-height:86%;text-transform:uppercase">Свяжитесь <br/>с нами</div>
<img src="/blk/kontakty/blue_contact.png" style="position:absolute;left:-47px;top:440px;width:576.63px;height:552.37px;object-fit:contain" alt="" />
${label(289, "Имя", 29)}
${line(337.08)}
${label(355.77, "Телефон", 56)}
${line(403.84)}
${label(422.54, "Сайт / соцсети проекта", 152)}
${line(470.61)}
${label(489.31, "Бюджет", 54)}
${line(537.38)}
<div id="kf-submit" style="position:absolute;left:429px;top:569.43px;width:101.49px;height:22.14px;background:#1C1C1C;border-radius:32.56px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:13.23px;line-height:86%;letter-spacing:-0.66px">Отправить</div>
${social(40, "/hero/icons/1_telegram.png")}
${social(69.41, "/hero/icons/3_instagram.png")}
${social(98.97, "/hero/icons/4_whatsapp.png", 24.86)}
${social(128.14, "/hero/icons/2_max.png", 24.86)}
<div id="kf-modal" style="position:absolute;left:429px;top:258px;width:299px;height:333px;display:none">
  <div style="position:absolute;left:0;top:0;width:299px;height:333px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);border-radius:12px"></div>
  <div style="position:absolute;left:30px;top:96px;width:240px;text-align:center;color:#C9C9D2;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:45px;line-height:86%">Спасибо!</div>
  <div style="position:absolute;left:35px;top:170px;width:230px;text-align:center;color:#1C1C1C;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:18px;line-height:110%">Мы свяжемся с вами в течение 15 минут</div>
  <div style="position:absolute;left:137px;top:234px;font-size:22px">OK</div>
  <div id="kf-close" style="position:absolute;left:10px;top:294px;width:279px;height:26px;background:#F0F0F0;border-radius:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#9A9895;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:13px">Закрыть</div>
</div>
</div>`;
