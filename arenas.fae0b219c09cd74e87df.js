(()=>{"use strict";const e="afterbegin",t="beforeend",a=(e,t)=>{const a=document.createElement(e);return t&&(Array.isArray(t)?t.forEach((e=>a.classList.add(e))):a.classList.add(t)),a};class r{constructor({player:e,name:t,hp:a,img:r}){this.player=e,this.name=t,this.hp=a,this.img=r,this.action={}}changeHp(){this.hp-=this.action.damage,this.hp<=0&&(this.hp=0),this.renderHP()}renderHP(){this.elHP.style.width=`${this.hp}%`}miss(){this.action.value=0}get elHP(){return document.querySelector(`.player${this.player} .life`)}get element(){const e=a("div",`player${this.player}`),t=a("div","progressbar"),r=a("div","character"),i=a("div","life"),s=a("div","name"),n=a("img");return i.style.width=`${this.hp}%`,s.innerText=this.name,n.src=this.img,t.appendChild(s),t.appendChild(i),r.appendChild(n),e.appendChild(t),e.appendChild(r),e}}const i=e=>{if(!Array.isArray(e))return e;if(0===e.length)throw new Error("Array is empty.");return e[((e=1,t=0)=>{const a=Math.ceil(Math.min(e,t)),r=Math.floor(Math.max(e,t));return Math.floor(a+Math.random()*(r-a+1))})(0,e.length-1)]},s={head:30,body:25,foot:20},n=Object.keys(s),h="start",l="end",c="hit",p="defence",o="draw",y={[h]:"Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",[l]:["Результат удара [playerWins]: [playerLose] - труп","[playerLose] погиб от удара бойца [playerWins]","Результат боя: [playerLose] - жертва, [playerWins] - убийца"],[c]:["[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.","[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.","[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.","[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.","[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.","[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.","[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.","[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.","[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.","[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.","[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.","[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.","[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.","[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.","[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.","[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.","[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.","[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага."],[p]:["[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.","[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.","[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.","[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.","[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.","[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.","[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.","[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение."],[o]:"Ничья - это тоже победа!"},d=e=>{let t=e.getHours(),a=e.getMinutes();return 0===a.length&&(a=`0${a}`),0===t.length&&(t=`0${t}`),`${t}:${a}`};class m{constructor(e,t,a){this.$container=e,this.time=t,this.type=a,this.template=i(y[this.type])}get $element(){const e=document.createElement("p");return e.textContent=this.text,e}show(){((a,r,i="beforeend")=>{switch(i){case e:a.prepend(r);break;case t:a.append(r);break;default:throw new Error(`Wrong render position: ${i}`)}})(this.$container,this.$element,e)}start(e,t){this.text=this.template.replace("[player1]",e).replace("[player2]",t).replace("[time]",d(this.time))}end(e,t){this.text=this.template.replace("[playerWins]",e).replace("[playerLose]",t)}defence(e,t){const a=d(this.time),r=this.template.replace("[playerKick]",e).replace("[playerDefence]",t);this.text=`${a}: ${r}`}hit(e,t,a,r,i){const s=d(this.time),n=this.template.replace("[playerKick]",e).replace("[playerDefence]",t);this.text=`${s} ${n}  -${r} [${a}/${i}]`}draw(){this.text=this.template}}const f=()=>{const e=a("div","reloadWrap"),t=a("button","button");return t.setAttribute("type","button"),t.textContent="Restart",t.addEventListener("click",(e=>{e.preventDefault(),window.location.reload()})),e.appendChild(t),e},u={$arena:document.querySelector(".arenas"),$formFight:document.querySelector(".control"),$chat:document.querySelector(".chat")},k=[JSON.parse(localStorage.getItem("player1")),JSON.parse(localStorage.getItem("player2"))];new class{constructor({$arena:e,$formFight:t,$chat:a}){this.$arena=e,this.$formFight=t,this.$chat=a}init(e){this.players=e.map(((e,t)=>{const a={...e,player:t+1};return new r(a)})),this.logs=[],this.winner=null,this.loser=null,[this.player,this.enemy]=this.players,this.handleFormFightSubmit=this.handleFormFightSubmit.bind(this),this.$formFight.addEventListener("submit",this.handleFormFightSubmit),this.renderPlayers()}handleFormFightSubmit(e){e.preventDefault(),this.player.action=(e=>{const t={};return e.forEach((e=>{e.checked&&(e.name===c&&(t.hit=e.value,t.value=s[e.value]),e.name===p&&(t.defence=e.value))})),t})(Object.values(e.target)),this.enemy.action=(()=>{const e=i(n),t=i(n);return{value:s[e],hit:e,defence:t}})(),this.fight()}fight(){this.players.forEach((e=>{this.attacker=e,this.defender=this.players.filter((e=>e!==this.attacker)).shift(),this.hit()})),this.$formFight.reset(),this.checkGameStatus()}hit(){this.attacker.action.hit!==this.defender.action.defence?(this.defender.action.damage=this.attacker.action.value,this.defender.changeHp(),this.showLog(c)):this.miss()}checkGameStatus(){0!==this.player.hp||0!==this.enemy.hp?0!==this.player.hp&&0!==this.enemy.hp||this.win():this.draw()}draw(){this.showLog(o),this.showResult("Ha, draw! You are all losers!"),this.finish()}finish(){this.$arena.appendChild(f()),this.$formFight.remove()}win(){0===this.player.hp&&(this.loser=this.player,this.winner=this.enemy),0===this.enemy.hp&&(this.loser=this.enemy,this.winner=this.player),this.showLog(l),this.showResult("wins",this.winner.name),this.finish()}miss(){this.attacker.miss(),this.showLog(p)}createLog(e){return new m(this.$chat,new Date,e)}renderPlayers(){this.players.forEach((e=>this.$arena.appendChild(e.element))),this.showLog(h)}showResult(e,t){const r=a("div","resultTitle");r.innerHTML=t?`${t} ${e}`:e,this.$formFight.remove(),this.$arena.appendChild(r),this.$arena.appendChild(f())}showLog(e){const t=new m(this.$chat,new Date,e);switch(e){case h:t.start(this.player.name,this.enemy.name);break;case l:t.end(this.winner.name,this.loser.name);break;case p:t.defence(this.attacker.name,this.defender.name);break;case c:t.hit(this.attacker.name,this.defender.name,this.defender.hp,this.attacker.action.value,100);break;case o:t.draw();break;default:throw new Error(`Unknow action type ${e}`)}this.logs.push(t),t.show()}}(u).init(k)})();
//# sourceMappingURL=arenas.fae0b219c09cd74e87df.js.map