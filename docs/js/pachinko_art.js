var canvas,ctx,timer,isstart,count,gtx,gty,tim,rand,xors,iso,gbai,imas,gim;

(function(){
    // グローバル変数初期化、フォントメニュー構築
    var a,b,c,d,e,f;
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    imas=[];
    a=document.getElementById("moji").value;
    a=a.split(/\r\n|\r|\n/);
    
    d=ctx.font;
    b="abcあいう桃栗柿";
    c=ctx.measureText(b).width;
    f=[];
    
    for(e=0;e<a.length;e++){
        ctx.font=d;
        ctx.font="10px "+a[e];
        if(ctx.measureText(b).width!=c){
            f.push(a[e]);
        }
    }
    b=document.getElementById("flis");
    for(a=0;a<f.length;a++){
        c=document.createElement("option");
        c.value=f[a];
        b.appendChild(c);
    }
    
    if(f.length)document.getElementById("fonttp").value=f[0];
    document.getElementById("moji").value="新台入荷";
})();


function setseed(){
    var a;
    a=namnam("seedti",0,10000000,0);
    xors={x:123456789,y:362436069,z:521288629,w:a};
    for(a=0;a<125;a++)rand();
}

function yomi(a){
    var b,c;
    a=+a;
    b=document.getElementById("file1").files[0];
    
    c = new FileReader();
    c.readAsDataURL(b);
    c.onload=function(e){
        e=e.target.result;
        var image=new Image();
        image.src=e;
        imas[a]=image;
    };
}

function aaa(){
    var a,b,c,d,e,s,h,max,grd,fon,fsize,gj,bai,nob,sir;
    ctx.globalCompositeOperation = "source-over";
    
    gj=document.getElementById("giji").checked;
    if(gj){
        rand=rando;
        setseed();
    }else{
        rand=Math.random;
    }
    canvas.width=namnam("yoko",10,1000,506);
    canvas.height=namnam("tate",10,1000,300);
    ctx.fillRect(0,0,canvas.width,canvas.height);
    gim=ctx.getImageData(0,0,canvas.width,canvas.height);
    gtx=canvas.width/2;
    gty=canvas.height/2;
    a=(gtx>gty)?gtx:gty;
    gbai=a/250;
    tim=rand()*1234567890+987654321;
    
    fon=document.getElementById("fonttp").value;
    if(!fon)fon="a";
    fsize=namnam("fontsz",1,300,90);
    
    a=+document.getElementById("haikei1").value;
    if(!a){
        if(imas[0]){
            ctx.drawImage(imas[0],0,0,canvas.width,canvas.height);
        }else{
            ctx.clearRect(0,0,canvas.width,canvas.height);
        }
    }else{
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    
    if(a==1){
        kum();
    }else if(a==2){
        mav();
    }else if(a==3){
        jur();
    }else if(a==4){
        mbl();
    }else if(a==5){
        curi();
    }else if(a==6){
        tikyuu();
    }else if(a==7){
        dai();
    }
    
    a=+document.getElementById("haikei2").value;
    if(gj)setseed();

    if(!(!a || a==4)){
        kage(350,0.1+rand()*0.5);
    }
    if(a==1){
        worm();
    }else if(a==2){
        ast();
    }else if(a==3){
        den();
    }else if(a==4){
        syuutyuu();

    }else if(a==5){

        //kage(350,0.6);

        gdara();
    }
    




    if(gj && a)setseed();
    bai=0.5+rand()*3;
    nob=0.5+rand();
    sir=0.5+rand();
    iso=rand()*Math.PI*2;
    
    max=100;
    d=fsize;
    a=document.getElementById("moji").value;
    
    if(a!==""){
        a=a.split(/\r\n|\r|\n/);
        for(e=0;e<max;e++){
            s=1-e/max;
            ctx.font=(d*(1-s/30*sir))+"px "+fon;
            h=0.5-Math.cos(s*Math.PI)/2;
            b=s*5+1;
            if(e<=max/2)b+=d*0.1*nob;
            if(e<30)b-=(1-e/30)*d/10;
            ctx.lineWidth=b;
            ctx.strokeStyle=setgrd(55,s*3*bai);
            if(e==max/2)ctx.strokeStyle=setgrd2(50,0);
            putmoji(a,"stroke",h,d);
        }
        ctx.fillStyle=setgrd2(0,0);
        putmoji(a,"fill",h,d);
    }
    

    if(document.getElementById("suibotu").checked)sanz();

    a=canvas.toDataURL("image/png");
    document.getElementById("alt").src=a;
}

function preview_layout(){
    var a,b,c;
    ctx.globalCompositeOperation = "source-over";
    canvas.width=namnam("yoko",10,1000,506);
    canvas.height=namnam("tate",10,1000,300);
    fon=document.getElementById("fonttp").value;
    if(!fon)fon="a";
    fsize=namnam("fontsz",1,300,90);
    if(imas[0]){
        ctx.drawImage(imas[0],0,0,canvas.width,canvas.height);
    }else{
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    ctx.fillStyle="rgb(255,255,255)";
    a=document.getElementById("moji").value;
    a=a.split(/\r\n|\r|\n/);
    ctx.font=fsize+"px "+fon;
    putmoji(a,"fill",0,fsize);
    a=canvas.toDataURL("image/png");
    document.getElementById("alt").src=a;
}

function kage(han,lit){
    var a,b,c,grd;
    grd=ctx.createRadialGradient(gtx,gty,0,gtx,gty,han*gbai);
    grd.addColorStop(0,"rgba(0,0,0,"+lit+")");
    grd.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function namnam(id,min,max,def){
    var a=document.getElementById(id);
    var b=a.value;
    if(isNaN(b))b=def;
    if(b<min)b=min;
    if(b>max)b=max;
    b=b|0;
    a.value=b;
    return b;
}

function putmoji(moji,typ,h,size){
    var a,b,c;
    for(b=0;b<moji.length;b++){
        c=ctx.measureText(moji[b]).width/2;
        ctx[typ+"Text"](moji[b],canvas.width/2-c,canvas.height/2-moji.length/2*size+(b+0.85)*size+h*20);
    }
}

function setgrd(col,r){
    var a,b,c,grd,max;
    grd=ctx.createLinearGradient(0,0,canvas.width,0);
    max=1000;
    for(a=0;a<max;a++){
        b=a/(max-1);
        c=Math.sin(b*7-r*5+iso)+Math.sin(b*13+r*3+iso*2)+Math.sin(b*73+r-iso*3);
        c=0.5+c/6;
        if(c<0)c=0;
        if(c>1)c=1;
        grd.addColorStop(b,"hsla("+((col-(0.5-c)*70)|0)+",90%,"+(0+c*100)+"%,0.3)");
    }
    return grd;
}

function setgrd2(col,r){
    var a,b,c,grd,max;
    grd=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    max=4000;
    for(a=0;a<max;a++){
        b=a/(max-1);
        c=Math.sin(b*3-r*5+iso)+Math.sin(b*7+r*3+iso*2)+Math.sin(b*23+r-iso*3);
        c=0.5+c/6;
        if(c<0)c=0;
        if(c>1)c=1;
        grd.addColorStop(b,"hsl("+col+",90%,"+(25+20*c)+"%)");
    }
    return grd;
}

function rando(){
    var t = xors.x ^ (xors.x << 11);
    xors.x = xors.y;
    xors.y = xors.z;
    xors.z = xors.w;
    xors.w = (xors.w^(xors.w>>>19))^(t^(t>>>8));
    return xors.w/4294967296+0.5;
}


function gdara(){
var a,b,c,p,max,col;

count=0;

max=13+(rand()*rand()*40)|0;
p=[];
c=0;
for(a=0;a<max;a++){
b=0.2+rand();
p.push(b);
c+=b;
}

c=Math.PI*2/c;
for(a=0;a<max;a++){
p[a]*=c;
}

r=rand()*Math.PI*2;


col=[(rand()*360)|0,(rand()*360)|0];

for(a=0;a<max;a++){

b=0.3+rand();
count=rand()*1000;

x=Math.cos(r)*140*gbai*b;
y=Math.sin(r)*140*gbai*b;

x1=Math.cos(r)*350*gbai;
y1=Math.sin(r)*350*gbai;

c=col[(rand()*2)|0];


bem(x+gtx,y+gty,x1+gtx,y1+gty,c,1,0.2+rand()*rand());

r+=p[a];
}




function bem(x1,y1,x2,y2,col,ban,s){
    var a,b,c,d,e,f,g,x,y,px,py,max,p1,p2,len,hon,ft,ft2,grd,tm,t,futosa;
    futosa=0.5;
s*=gbai;
    ctx.globalCompositeOperation = "lighter";
    
    ctx.strokeStyle=ctx.fillStyle="hsla("+col+",60%,60%,0.3)";
    grd=ctx.createRadialGradient(x1,y1,0,x1,y1,futosa*70);
    grd.addColorStop(0,"hsla("+col+",60%,60%,0.9)");
    grd.addColorStop(1,"hsla("+col+",60%,60%,0.0)");
    ctx.fillStyle=ctx.strokeStyle=grd;
    
    //if(rand()<0.3)pika(x1,y1,futosa*30*(0.5+rand()/2));
    x=x1+(x2-x1)*0.97;
    y=y1+(y2-y1)*0.97;
    grd=ctx.createRadialGradient(x,y,0,x,y,futosa*100);
    grd.addColorStop(0,"hsla("+col+",60%,60%,0.4)");
    grd.addColorStop(1,"hsla("+col+",60%,60%,0.0)");
    ctx.fillStyle=ctx.strokeStyle=grd;
    //pika(x,y,futosa*100*rand());
    
    ctx.strokeStyle=ctx.fillStyle="hsla("+col+",60%,60%,0.1)";
    duma(x1,y1,x2,y2,4,s*futosa);
    ctx.strokeStyle=ctx.fillStyle="hsla("+col+",60%,60%,0.15)";
    
    ft=((count/150*5+ban/2)%1)*1.4-0.2;
    ban+=x1*13+y1*23;
    
    a=Math.atan2((y2-y1),(x2-x1));
    px=Math.cos(a);
    py=Math.sin(a);
    max=100;
    hon=100;
    
    for(g=0;g<hon;g++){
        tm=g/hon*Math.PI;
        ft2=((count/150*3+g/hon+ban/3)%1)*1.4-0.2;
        t=((count/150+g/hon*7)%1)*3-1;
        p1=[];
        for(a=0;a<max;a++){
            
            
            b=t+a/max;
            if(b<0 || b>1)continue;
            c=Math.sin(tim+tm*3+b*7)*20+
                Math.sin(tim*2+tm*7+g*2-b*17)*15+
                    Math.sin(tim*3+tm*11+g*3-b*37)*5;
            c*=futosa*s;
            
            e=1;
            if(b<0.2)e=b/0.2;
            //if(b>0.8)e=(1-b)/0.2;
            
            f=0;
            if(b>ft && b<ft+0.2){
                f=(ft+0.2-b)/3;
                e+=(ft+0.2-b)/0.6;
            }
            if(b>ft2 && b<ft2+0.2){
                f+=(ft2+0.2-b)/7;
                e+=(ft2+0.2-b)/0.9;
            }
            
            e*=1-Math.random()/4;
            p1.push([x1+(x2-x1)*(b-f)+py*c*e,y1+(y2-y1)*(b-f)-px*c*e,e]);
        }
        
        if(p1.length<2)continue;
        len=p1.length;
        p2=[];
        for(a=0;a<len-1;a++){
            b=p1[a];
            c=p1[a+1];
            x=b[0]-c[0];
            y=b[1]-c[1];
            b=Math.atan2(-y,x)+Math.PI/2;
            x=Math.cos(b);
            y=Math.sin(b);
            e=1;
            if(a<3)e*=a/3;
            //if(a>len-5)e*=(len-2-a)/3;
            p2.push([x*e,y*e]);
        }
        ctx.beginPath();
        
        f=7*futosa*s;
        for(a=0;a<len-1;a++){
            b=p1[a];
            c=p2[a];
            ctx.lineTo(b[0]+c[0]*f,b[1]-c[1]*f);
        }
        for(a=len-2;a>=0;a--){
            b=p1[a];
            c=p2[a];
            ctx.lineTo(b[0]-c[0]*f,b[1]+c[1]*f);
        }
        ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

}


function pika(tx,ty,s){
    var a,b,c,r,x,y,p,max;
    s*=1-Math.random()/3;
    max=(20+s*7)|0;
    r=0;
    for(c=0;c<3;c++){
        p=[];
        for(a=0;a<max;a++){
            b=0.1+Math.random();
            x=Math.cos(r)*(b+c/2);
            y=Math.sin(r)*(b+c/2);
            p.push([x,y]);
            r+=Math.PI*2/max;
        }
        ctx.beginPath();
        for(a=0;a<max;a++)ctx.lineTo(tx+p[a][0]*s,ty+p[a][1]*s);
        ctx.fill();
    }
    
    ctx.beginPath();
    ctx.arc(tx,ty,s/2,0,Math.PI*2,0);
    ctx.fill();
    
    
    ctx.beginPath();
    ctx.arc(tx,ty,s/4,0,Math.PI*2,0);
    ctx.fill();
    
    ctx.lineWidth=s/10;
    ctx.beginPath();
    ctx.arc(tx,ty,s*0.8,0,Math.PI*2,0);
    ctx.stroke();
    
    ctx.lineWidth=s/20;
    ctx.beginPath();
    ctx.arc(tx,ty,s*1.2,0,Math.PI*2,0);
    ctx.stroke();
}

function ina(sx,sy,ex,ey,kai,hai,bai){
    var a,rx,ry,x1,y1,x2,y2;
    rx=(ex-sx)/3;ry=(ey-sy)/3;
    a=(Math.random()-0.5)*bai;
    x1=sx+rx-ry*a;y1=sy+ry+rx*a;
    a=(Math.random()-0.5)*bai;
    x2=sx+rx*2-ry*a;y2=sy+ry*2+rx*a;
    if(kai){
        ina(sx,sy,x1,y1,kai-1,hai,bai);
        ina(x1,y1,x2,y2,kai-1,hai,bai);
        ina(x2,y2,ex,ey,kai-1,hai,bai);
    }else{
        hai.push(sx,sy,x1,y1,x2,y2);
    }
}

function duma(sx,sy,ex,ey,kai,s){
    var a,b,c,d;
    for(c=0;c<3;c++){
        a=[];
        ina(sx,sy,ex,ey,kai,a,0.8);
        a.push(ex,ey);
        ctx.beginPath();
        for(b=0;b<a.length;b+=2)ctx.lineTo(a[b],a[b+1]);
        b=s*15;
        for(d=0;d<5;d++){
            ctx.lineWidth=b;
            ctx.stroke();
b*=0.5;
        }
    }
}


}




function sanz(){
var count,sita,hei,bgr,gdt,imtank,hztank;
ctx.fillStyle="rgb(0,0,0)";
ctx.fillRect(0,sita,canvas.width,canvas.width-sita);



sita=(canvas.height*(0.55+rand()*0.1))|0;
hei=canvas.height-sita;
//ctx.fillRect(0,0,canvas.width,canvas.height);
gdt=ctx.getImageData(0,sita,canvas.width,hei);
hztank=[];
for(var a=0;a<hei;a++){
hztank[a]=[];
for(var b=0;b<canvas.width;b++)hztank[a][b]=[0,0];
}



init();


aaaa();
ctx.globalCompositeOperation = "source-over";

function pika(tx,ty,s){
    var a,b,c,r,x,y,p,max;
    max=(10+s*3)|0;
    r=0;
    ctx.fillStyle=ctx.strokeStyle="hsla("+((rand()*360)|0)+",30%,50%,0.7)";
    
    p=[];
    for(a=0;a<max;a++){
        b=0.1+rand();
        x=Math.cos(r)*b;
        y=Math.sin(r)*b;
        p.push([x,y]);
        r+=Math.PI*2/max;
    }
    
    ctx.beginPath();
    for(a=0;a<max;a++)ctx.lineTo(tx+p[a][0]*s,ty+p[a][1]*s);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(tx,ty,s/2,0,Math.PI*2,0);
    ctx.fill();
    
    if(s<3)return;
    ctx.beginPath();
    ctx.arc(tx,ty,s/4,0,Math.PI*2,0);
    ctx.fill();
    ctx.lineWidth=s/10;
    ctx.beginPath();
    ctx.arc(tx,ty,s*0.8,0,Math.PI*2,0);
    ctx.stroke();
}

function init(){
var a,b,c,d,e,grd,pt,mt,sco,dt,iti,x,y,y0,ritu,bai,max,plen,st;
/*
grd=ctx.createLinearGradient(0,0,0,sita);
a=244;
grd.addColorStop(0,"hsl("+a+",90%,20%)");
grd.addColorStop(1,"hsl("+a+",90%,40%)");
ctx.fillStyle=grd;
//tim=new Date().getTime();

ctx.fillRect(0,0,canvas.width,sita);
ctx.globalCompositeOperation = "lighter";
max=1000;
    
for(c=0;c<3;c++){
for(a=0;a<max;a++){
y0=rand();
y=y0*sita;
x=rand()*canvas.width;
b=rand();
b*=b*b*b*b;
if(rand()<0.5)b*=-1;
x=(b*0.7+0.5)*canvas.width;
y0=1-y0+0.5;
y0*=y0;
x+=(Math.sin(y0*8+c+tim)+Math.sin(y0*4+c*2.2+tim*3))*20*y0;
b=rand();
b=Math.pow(b,40);
pika(x,y,0.5+b*9);
}
}

ctx.globalCompositeOperation = "source-over";
pt=[];
plen=5000;
for(a=0;a<plen;a++)pt[a]=rand()*rand();
for(d=0;d<5;d++){
mt=new Float32Array(canvas.width+1);
ritu=1;
bai=1;
sco=0;
for(b=0;b<7;b++){
st=rand()*pt.length;
c=ritu;
        for(a=0;a<mt.length;a++){
            px=a/bai+st;
            x=Math.floor(px);
            px=px-x;
            x=x%plen;if(x<0)x+=plen;
            mt[a]+=noize1(px,pt[x%plen],pt[(x+1)%plen],pt[(x+2)%plen])*c;
        }
bai*=2;
sco+=c;
ritu*=2;
}

sco=1/sco;
ctx.fillStyle="hsl(225,60%,"+(20-d*3)+"%)";
ctx.beginPath();
for(a=0;a<mt.length;a++){
e=1-Math.sin(a/mt.length*Math.PI)/2;
ctx.lineTo(a,sita-mt[a]*2*e+10+d*5);
}
ctx.lineTo(canvas.width,sita+10+d*5);
ctx.lineTo(0,sita+10+d*5);
ctx.fill();
}

*/

bgr=ctx.getImageData(0,0,canvas.width,sita);
dt=bgr.data;
imtank=[];
            iti=0;
            for(a=0;a<sita;a++){
                imtank[a]=[];
                for(b=0;b<canvas.width;b++){
                    imtank[a][b]=[dt[iti],dt[iti+1],dt[iti+2]];
                    iti+=4;
                }
            }
}

function noize1(r1,p0,p1,p2){
    var r2=1-r1,
        x0=(p0+p1)*0.5,x1=(p1+p2)*0.5;
    return (x0*r2+p1*r1)*r2+(p1*r2+x1*r1)*r1;
}

function pmap(x,y,tm){
    var a,b,c,d,e,sx,sy,ex,ey,x1,y1,han,hz,bai,pei;
    
pei=3;
    han=(y+0.2)*120*(tm);
    x*=canvas.width;
    y*=hei;
    sx=Math.floor(x-han)-1;
    if(sx<0)sx=0;
    sy=Math.floor(y-han/pei)-1;
    if(sy<0)sy=0;
    ex=Math.floor(x+han)+1;
    if(ex>=canvas.width)ex=canvas.width;
    ey=Math.floor(y+han/pei)+1;
    if(ey>=hei)ey=hei;
    
    hz=hztank;
    e=(0.5-tm)*2;
    e*=e*2;
    for(a=sy;a<ey;a++){
        for(b=sx;b<ex;b++){
            y1=a-y;
            x1=b-x;
            y1*=pei;
            c=Math.pow(x1*x1+y1*y1,0.5)/han;
            if(c<=1){
                c=1-c;
                d=Math.sin(c*7+tm*22)/2*e;
                d*=0.5-Math.cos(c*Math.PI*2)/2;
                c+=d;
                hz[a][b][0]-=x1*c/24*e;
                hz[a][b][1]-=y1*c/8*e;
            }
        }
    }
}

function aaaa(){
var a,b,c,d,e,f,x,y,x1,y1,hz,dt,cou,nm,bai,
c1,c2,c3,max,tm,tp,mx,my,mx1,my1,rx,ry,rx1,ry1,
p1,p2,p3,p4;
ctx.putImageData(bgr,0,0);
ctx.globalCompositeOperation = "lighter";
//tim=new Date().getTime()/1000;
hz=hztank;
    for(a=0;a<hei;a++){
        y=a/hei;
        y=1-y;
        y*=y*y;
        y=1-y;
        d=Math.sin((1-y)*10+tim/5);
        y=d*4;
        y=y%2;
        if(y<0)y+=2;
        if(y>1)y=2-y;
        d=a/hei/4;
        for(b=0;b<canvas.width;b++){
            x=b/canvas.width;
            x-=0.5;
            x=x*d;
            hz[a][b][0]=-x;
            hz[a][b][1]=y;
        }
    }

    max=700;
    p=[];
    for(a=0;a<max;a++){
        x=a/(max-1)*canvas.width;
x=(x+tim*13)%canvas.width;
        tm=2+Math.sin(a*13+1)+Math.sin(a*31+2)+tim+a*7;
        tm=tm%5;
        b=0.5+Math.sin(a*5)/2;
        tp=1-b;
tp=Math.pow(tp,7)*0.9+0.1;
        if(tm<1){
            p.push([x,-tp*hei+(sita+hei*tp*2)*tm,tp*0.7+0.3]);
        }else if(tm<3){
            pmap(a/(max-1),tp,(tm-1)/4);
        }
    }

c1p=0.5+rand();
c2p=0.5+rand();
c3p=0.5+rand();

dt=gdt.data;
    iti=0;
    for(a=0;a<hei;a++){
        for(b=0;b<canvas.width;b++){
            y=a/sita+hz[a][b][1]/18;
            x=b/canvas.width+hz[a][b][0];
            if(x<0)x=0;
            if(y<0)y=0;
            if(y>=1)y=1;
            if(x>=1)x=1;
            y=1-y;
            x*=imtank[0].length-1;
            y*=imtank.length-1;
            mx=x|0;my=y|0;
            mx1=mx+1;my1=my+1;
            if(mx1>=imtank[0].length)mx1=imtank[0].length-1;
            if(my1>=imtank.length)my1=imtank.length-1;
            
            rx=x-mx;ry=y-my;rx1=1-rx;ry1=1-ry;
            p1=rx1*ry1;p3=rx*ry1;p2=rx1*ry;p4=rx*ry;
           
            c1=imtank[my][mx][0]*p1+
                imtank[my1][mx][0]*p2+imtank[my][mx1][0]*p3+imtank[my1][mx1][0]*p4;
            c2=imtank[my][mx][1]*p1+
                imtank[my1][mx][1]*p2+imtank[my][mx1][1]*p3+imtank[my1][mx1][1]*p4;
            c3=imtank[my][mx][2]*p1+
                imtank[my1][mx][2]*p2+imtank[my][mx1][2]*p3+imtank[my1][mx1][2]*p4;
            

            dt[iti]=(c1*c1p)|0;
            dt[iti+1]=(c2*c2p)|0;
            dt[iti+2]=(c3*c3p)|0;
            iti+=4;
        }
    }
    ctx.putImageData(gdt,0,sita);
/*
    for(a=0;a<p.length;a++){
        d=p[a][2];
        ctx.lineWidth=2*d;
        for(b=0;b<3;b++){
            c=d*b*2;
            ctx.strokeStyle="rgba(25,37,73,"+(1-b/3)+")";
            ctx.beginPath();
            ctx.lineTo(p[a][0]+0.3*d,p[a][1]-2*d-c);
            ctx.lineTo(p[a][0]+0.3*d,p[a][1]-c);
            ctx.stroke();
            
            ctx.strokeStyle="rgba(120,130,155,"+(1-b/3)+")";
            ctx.beginPath();
            ctx.lineTo(p[a][0]-0.3*d,p[a][1]-2*d-c);
            ctx.lineTo(p[a][0]-0.3*d,p[a][1]-c);
            ctx.stroke();
        }
    }
*/
}

}



function syuutyuu(){
var a,b,c,r,x,y,x1,y1,x2,y2,max,p;

ctx.fillStyle="rgb(0,0,0)";



max=70;
p=[];
c=0;
for(a=0;a<max;a++){
b=0.2+rand();
p.push(b);
c+=b;
}

c=Math.PI*2/c;
for(a=0;a<max;a++){
p[a]*=c;
}


r=rand()*Math.PI*2;
for(a=0;a<max;a++){

b=0.8+rand()*0.4;

c=0.005+rand()*0.01;

x=Math.cos(r)*100*gbai*b;
y=Math.sin(r)*100*gbai*b;

x1=Math.cos(r-c)*400*gbai*b;
y1=Math.sin(r-c)*400*gbai*b;
x2=Math.cos(r+c)*400*gbai*b;
y2=Math.sin(r+c)*400*gbai*b;


ctx.beginPath();

ctx.lineTo(gtx+x,gty+y);
ctx.lineTo(gtx+x1,gty+y1);
ctx.lineTo(gtx+x2,gty+y2);
ctx.fill();

r+=p[a];
}





}

function tikyuu(){
    var a,b,c,hizumi1,hizumi2;
    
    kyuu(gim,gtx,gty,gtx-50*gbai,gty-30*gbai,170*gbai,[61,91,255],[10,20,60]);
    ctx.putImageData(gim,0,0);
    hizumi1=hizumiget(170*gbai,gtx,gty);
    hizumi2=hizumiget(172*gbai,gtx,gty);
    
    a=Math.floor(rand()*100000);
    
    kumo=pnoise(480,480,a,0,5,1.4);
    riku=pnoise(480,480,a+1,0,5,1.9);
    
    tik(gim,riku,hizumi1,0,0,0.52,0.525,[0,0,0],[44,105,44]);
    tik(gim,kumo,hizumi2,0,0,0.48,0.6,[0,0,0],[255,255,255]);
    
    ctx.putImageData(gim,0,0);
    
    function tik(ime,rt,hz,rtx,rty,lim,gen,col1,col2){
        var a,b,c,kyori,iti,kaku,x,y,r1,r2,c1,c2,c3,atai;
        iti=0;
        for(a=0;a<ime.height;a++){
            for(b=0;b<ime.width;b++){
                c=hz[a][b];
                if(c!==undefined){
                    atai=noiget(rt,c[1]+rty,c[0]+rtx);
                    
                    if(atai>lim){
                        r1=(atai-lim)/(1-lim);
                        r2=1-r1;
                        c1=col1[0]*r1+col2[0]*r2;
                        c2=col1[1]*r1+col2[1]*r2;
                        c3=col1[2]*r1+col2[2]*r2;
                        
                        r1=1;
                        if(atai<gen)r1=1-(gen-atai)/(gen-lim);
                        r1*=c[2];
                        r2=1-r1;
                        
                        ime.data[iti]=Math.floor(c1*r1+ime.data[iti]*r2);
                        ime.data[iti+1]=Math.floor(c2*r1+ime.data[iti+1]*r2);
                        ime.data[iti+2]=Math.floor(c3*r1+ime.data[iti+2]*r2);
                    }
                }
                iti+=4;
            }
        }
    }
    
    function kyuu(ime,tx,ty,gx,gy,han,col1,col2){
        var a,b,iti,kyori,r1,r2,er,dt;
        iti=0;
        dt=ime.data;
        for(a=0;a<ime.height;a++){
            for(b=0;b<ime.width;b++){
                kyori=Math.pow((ty-a)*(ty-a)+(tx-b)*(tx-b),0.5);
                if(kyori<han){
                    er=1;
                    if(han-kyori<2)er=(han-kyori)/2;
                    r1=Math.pow((gy-a)*(gy-a)+(gx-b)*(gx-b),0.5)/han/1.3;
                    if(r1>1)r1=1;
                    r1=0.5-Math.cos(r1*Math.PI)/2;
                    r2=1-r1;
                    dt[iti]=Math.floor((col1[0]*r2+col2[0]*r1)*er);
                    dt[iti+1]=Math.floor((col1[1]*r2+col2[1]*r1)*er);
                    dt[iti+2]=Math.floor((col1[2]*r2+col2[2]*r1)*er);
                }else{
                    dt[iti]=dt[iti+1]=dt[iti+2]=0;
                }
                iti+=4;
            }
        }
    }
    
    function hizumiget(han,tx,ty){
        var a,b,c,d,kyori,kaku,hz;
        hz=[];
        for(a=0;a<canvas.height;a++){
            hz[a]=[];
            for(b=0;b<canvas.width;b++){
                kyori=Math.pow((ty-a)*(ty-a)+(tx-b)*(tx-b),0.5);
                if(kyori<han){
                    kaku=Math.atan2(a-ty,b-tx);
                    c=(Math.PI/2-Math.acos(kyori/han))*han;
                    d=1;
                    if(han-kyori<2)d=(han-kyori)/2;
                    hz[a][b]=[Math.sin(kaku)*c,Math.cos(kaku)*c,d];
                }
            }
        }
        return hz;
    }
}

function noiget(rt,y,x){
    var x1,y1,x2,y2,mx,my,px,py,mf,wid,hei;
    mf=Math.floor;
    hei=rt.length;
    wid=rt[0].length;
    
    x=x%wid;if(x<0)x+=wid;
    y=y%hei;if(y<0)y+=hei;
    mx=mf(x);my=mf(y);
    
    x1=x-mx;
    x2=1-x1;
    y1=y-my;
    y2=1-y1;
    
    if(mx>=wid)mx=0;
    if(my>=hei)my=0;
    px=mx+1;if(px>=wid)px=0;
    py=my+1;if(py>=hei)py=0;
    
    return rt[my][mx]*y2*x2+rt[py][mx]*y1*x2+rt[my][px]*y2*x1+rt[py][px]*y1*x1;
}




function pnoise(tate,yoko,seed,ss,es,bure){
    var a,b,c,d,rt,oct,wid,hei,ritu;
    var mf=Math.floor;
    gseed=seed;
    
    oct=new Array(es-ss+1);
    b=1<<es;
    tate=Math.ceil(tate/b)*b;
    yoko=Math.ceil(yoko/b)*b;
    rt=dubar(tate,yoko);
    
    b=1<<ss;
    for(a=ss;a<es+1;a++){
        oct[a-ss]=pnoi(tate/b,yoko/b,a);
        b*=2;
    }
    
    ritu=0;
    b=1;
    for(a=0;a<oct.length;a++){
        ritu+=b;
        b*=bure;
    }
    
    for(a=0;a<tate;a++){
        for(b=0;b<yoko;b++){
            d=0;
            e=1;
            for(c=0;c<oct.length;c++){
                d+=oct[c][a][b]*e;
                e*=bure;
            }
            d/=ritu;
            rt[a][b]=d;
        }
    }
    return rt;
    
    function pnoi(hei,wid,ss){
        var a,b,c,oct,oct2,x,y,px,py,px2,py2,x1,y1,x2,y2,rt,hei2,wid2;
        var mf=Math.floor;
        var pai=Math.PI/2;
        ss=1<<ss;
        hei2=hei*ss;wid2=wid*ss;
        
        oct=dubar(hei,wid);
        oct2=dubar(hei,wid);
        rt=dubar(hei2,wid2);
        
        for(a=0;a<hei;a++){
            for(b=0;b<wid;b++){
                gseed=(641*gseed+3313)%131072;
                //oct2[a][b]=gseed/131072;
                oct2[a][b]=rand();
            }
        }
        
        for(a=0;a<hei;a++){
            for(b=0;b<wid;b++){
                py=a-1;if(py<0)py=hei-1;
                py2=a+1;if(py2>=hei)py2=0;
                px=b-1;if(px<0)px=wid-1;
                px2=b+1;if(px2>=wid)px2=0;
                
                oct[a][b]=oct2[py][px]/16+oct2[py][b]/8+oct2[py][px2]/16+
                    oct2[a][px]/8+oct2[a][b]/4+oct2[a][px2]/8+
                        oct2[py2][px]/16+oct2[py2][b]/8+oct2[py2][px2]/16;
            }
        }
        
        for(a=0;a<hei2;a++){
            for(b=0;b<wid2;b++){
                if(ss!=1){
                    x=mf(b/ss);
                    px=x+1;
                    if(px>=wid)px=0;
                    x1=b/ss-x;
                    x2=1-x1;
                    
                    y=mf(a/ss);
                    py=y+1;
                    if(py>=hei)py=0;
                    y1=a/ss-y;
                    y2=1-y1;
                    
                    rt[a][b]=oct[y][x]*x2*y2+oct[y][px]*x1*y2+
                        oct[py][x]*x2*y1+oct[py][px]*x1*y1;
                }else{
                    rt[a][b]=oct[a][b];
                }
            }
        }
        return rt;
    }
    
    function dubar(r1,r2){
        var a,b;
        a=new Array(r1);
        for(b=0;b<r1;b++){
            a[b]=new Float32Array(r2);
        }
        return a;
    }
    
}

function dai(){
    var a,b,c,hizumi,maisuu;
    
    
    noitank=pnoise(200,200,(rand()*100000),0,3,1);
    hizumi=hizumiget(gtx+(rand()-0.5)*100*gbai,gty+(rand()-0.5)*100*gbai);
    maisuu=68;
    count=maisuu-1;
    
    beta3(canvas.width,canvas.height,noitank,hizumi,0,0);
    
    ctx.putImageData(gim,0,0);
    
    function beta3(yoko,tate,rt,hz,hosei,hosei2){
        var a,b,c,d,e,f,y,x,pai,wid,han,kaku,mf,hani,col,dt;
        var c1,c2,c3;
        dt=gim.data;
        pai=Math.PI*2;
        wid=rt.length;
        mf=Math.floor;
        col=[
            [0,0,0],[75,35,35],[155,0,0],[255,0,0],[255,155,0],[255,255,0],[255,255,215]
        ];
        hani=30;
        hosei=rt[0].length*hosei;
        hosei2=wid*hosei2;
        
        c=0;
        for(a=0;a<tate;a++){
            for(b=0;b<yoko;b++){
                d=noiget(rt,hz[a][b][0]+hosei,hz[a][b][1]+hosei2);
                d=(d-0.4)/0.6;
                d*=hz[a][b][2];
                d=gra(d,col);
                dt[c]=d[0];
                dt[c+1]=d[1];
                dt[c+2]=d[2];
                c+=4;
            }
        }
    }
    
    function hizumiget(tx,ty){
        var a,b,c,pai,x,y,wid,han,hani,kaku,hz;
        pai=Math.PI*2;
        hz=[];
        hani=30;
        wid=noitank[0].length;
        
        for(a=0;a<canvas.height;a++){
            hz[a]=[];
            y=(ty-a)/gbai;
            for(b=0;b<canvas.width;b++){
                x=(tx-b)/gbai;
                han=Math.pow(y*y+x*x,0.5);
                kaku=Math.atan2(y,x)/pai*wid;
                if(han>hani){
                    d=hani/han;
                    d=Math.pow(d,0.1);
                    han=hani+Math.pow(han-hani,d);
                }
                d=2;
                if(han<80)d=(han-hani)/(80-hani)*2;
                hz[a][b]=[han*1.7,kaku,d];
            }
        }
        return hz;
    }
    
}

function gra(atai,col){
    var a,b,c,d;
    var c1,c2,c3,N1,N2;
    
    if(atai<0)atai=0;
    if(atai>1)atai=1;
    atai*=col.length;
    N1=Math.floor(atai);
    N2=N1+1;
    if(N1>=col.length)N1=col.length-1;
    if(N2>=col.length)N2=col.length-1;
    a=atai%1;
    a=0.5-Math.cos(a*Math.PI)/2;
    b=1-a;
    
    c1=col[N1][0]*b+col[N2][0]*a;
    c2=col[N1][1]*b+col[N2][1]*a;
    c3=col[N1][2]*b+col[N2][2]*a;
    return [c1,c2,c3];
}


function noiget(rt,y,x){
    var x1,y1,x2,y2,mx,my,px,py,mf,wid,hei;
    mf=Math.floor;
    hei=rt.length;
    wid=rt[0].length;
    
    x=x%wid;if(x<0)x+=wid;
    y=y%hei;if(y<0)y+=hei;
    mx=mf(x);my=mf(y);
    
    x1=x-mx;
    x2=1-x1;
    y1=y-my;
    y2=1-y1;
    
    if(mx>=wid)mx=0;
    if(my>=hei)my=0;
    px=mx+1;if(px>=wid)px=0;
    py=my+1;if(py>=hei)py=0;
    
    return rt[my][mx]*y2*x2+rt[py][mx]*y1*x2+rt[my][px]*y2*x1+rt[py][px]*y1*x1;
}

function ast(){
    var a,b,c,d,e,f,g,h,i,n,p,q,r,s,x,y,pt,size,step,ki,gu,pr,N,gb;
    gb=1/(gbai*gbai);
    N=fi()?7:11;
    size=4620;
    
    ctx.globalCompositeOperation = "lighter";
    
    h=[];
    h[2]=0.3+rand()*0.2;
    h[3]=0.1+rand()*0.1;
    h[5]=1+rand()*4;
    h[6]=1+rand();
    h[7]=1+rand();
    h[0]=0.4+rand()*0.2;
    for(a=2;a<8;a++)if(fi())h[a]*=-1;
    
    ki=[1,3,5,7,9,11];
    gu=[0,0,2,4,6,8,10];
    s=[];q=[];
    pr=(1+rand()*(N-1)|0)/N;
    
    for(a=0;a<2;a++){
        if(fi()){
            s[a]=[Math.cos,Math.sin];
            q[a]=rg(ki)-pr;
        }else{
            s[a]=[Math.sin,Math.cos];
            q[a]=rg(gu)+pr;
        }
    }
    for(a=2;a<8;a++){
        b=fi();
        if(!ki.length)b=0;
        if(!gu.length)b=1;
        q[a]=b ? rg(ki) : rg(gu);
        if(fi())q[a]*=-1;
        if(a>5)b=!b;
        s[a]=b ? Math.cos : Math.sin;
    }
    
    n=[];p=[];
    for(a=0;a<3;a++)n[a]=fi() ? 1 : -1;
    step=Math.PI*2/size*N;
    r=0;
    for(f=0;f<size;f++){
        b=s[6](r*q[6]+s[3](r*q[3])*h[5])*n[0];
        a=1+b*h[0];
        d=s[7](r*q[7]);
        e=-d;
        d*=(2-a)*n[1];e*=(2-a)*n[2];
        c=s[4](r*q[4]+s[5](r*q[5])*h[7])/4*h[6]*(a-(1-h[0]));
        x=Math.sin(r*pr+c)*a+s[0][0](r*q[0])*h[2]*d+s[1][0](r*q[1])*h[3]*e;
        y=Math.cos(r*pr+c)*a+s[0][1](r*q[0])*h[2]*d+s[1][1](r*q[1])*h[3]*e;
        p[f]=[x*140*gbai+gtx,y*140*gbai+gty];
        r+=step;
    }
    
    ctx.beginPath();
    h=0;
    for(d=0;d<3;d++){
        g=(rand()*360)|0;
        h+=1+(rand()*3)|0;
        i=50+(rand()*20)|0;
        for(a=0;a<p.length;a++){
            ctx.beginPath();
            e=[];
            for(b=0;b<3;b++){
                c=p[(a+b*((d+1)*h))%p.length];
                e.push(c);
                ctx.lineTo(c[0],c[1]);
            }
            
            f=e[0][0]*(e[1][1]-e[2][1]);
            f+=e[1][0]*(e[2][1]-e[0][1]);
            f+=e[2][0]*(e[0][1]-e[1][1]);
            f*=gb;
            if(f>45 && f<8000){
                ctx.fillStyle="hsla("+g+","+i+"%,50%,"+(45/f)+")";
                ctx.fill();
            }
        }
    }
    
    function fi(){return (rand()<0.5);}
    function rg(ha){
        var a,b;
        a=(ha.length*rand())|0;
        b=ha[a];
        ha[a]=ha[ha.length-1];
        ha.pop();
        return b;
    }
    ctx.globalCompositeOperation = "source-over";
}

function den(tx,ty,s,co){
    var a,b,c,d,e,x,y;
    tx=gtx;
    ty=gty;
    s=3+rand();
    co=(rand()*360)|0;
    
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle=ctx.fillStyle="hsla("+co+",60%,60%,0.15)";
    for(a=0;a<90;a++){
        b=rand()*Math.PI*2;
        x=y=0;
        ctx.beginPath();
        ctx.moveTo(tx,ty);
        for(c=0;c<50;c++){
            x+=Math.cos(b);
            y+=Math.sin(b);
            d=Math.pow(x*x+y*y,0.5);
            e=Math.sin(d/15);
            d=70*s*e/d*gbai;
            ctx.lineTo(x*d+tx,y*d+ty);
            b+=(rand()-0.5)*2;
        }
        
        b=0.1+rand()*0.6;
        b*=gbai;
        ctx.lineWidth=4*b*s;
        ctx.stroke();
        ctx.lineWidth=2*b*s;
        ctx.stroke();
        ctx.lineWidth=1*b*s;
        ctx.stroke();
        
    }
    ctx.lineWidth=1;
    ctx.fillStyle="hsla("+co+",60%,60%,0.01)";
    for(a=0;a<20;a++){
        ctx.beginPath();
        ctx.arc(tx,ty,(a*4+2)*s,0,Math.PI*2,0);
        ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
}

function worm(){
    var a,b,rad,rtank,rrtank,res,speed,count,sokudo,gime,stmax,stank,ctank,nami,tp;
    
    tp=(rand()*4)|0;
    stmax=5000;
    stank=new Float32Array(stmax);
    ctank=new Float32Array(stmax);
    nami=new Float32Array(stmax);
    rad=0;
    b=Math.PI*2/stmax;
    for(a=0;a<stmax;a++){
        stank[a]=Math.sin(rad);
        ctank[a]=Math.cos(rad);
        rad+=b;
    }
    
    rtank=[];rrtank=[];
    for(a=0;a<80;a++)rtank[a]=rand();
    sokudo=21;
    count=0;
    res=0;
    speed=2;
    
    for(a=0;a<stmax;a++)nami[a]=noize1(a/stmax*rtank.length,rtank);
    
    ctx.globalCompositeOperation = "lighter";
    
    if(!tp){
        gyar(0);
    }else if(tp==1){
        gyar2(0);
    }else if(tp==2){
        ina2(rand());
    }else{
        gyar(0);
        gyar2(0);
        ina2(rand());
    }
    
    ctx.globalCompositeOperation = "source-over";
    
    function ina2(r){
        var a,b,x,y;
        ctx.strokeStyle="hsla("+((360*rand())|0)+",60%,60%,0.2)";
        b=Math.PI*2/13;
        for(a=0;a<13;a++){
            x=Math.cos(r)*350*gbai+gtx;
            y=Math.sin(r)*350*gbai+gty;
            ina(gtx,gty,x,y,0.8,5+rand()*15);
            r+=b;
        }
    }
    
    function ina(sx,sy,ex,ey,bai,haba){
        var a,b,c,d,e,rx,ry,mt,tt,tt2,kai;
        
        kai=5;
        mt=[];
        b=2;
        for(a=0;a<kai;a++){
            mt[a]=new Float32Array(b*2);
            b=(b-1)*3+1;
        }
        mt[0][0]=sx;mt[0][1]=sy;mt[0][2]=ex;mt[0][3]=ey;
        
        for(a=0;a<kai-1;a++){
            tt=mt[a];tt2=mt[a+1];
            c=tt.length/2-1;
            
            for(b=0;b<c;b++){
                d=b*2;
                sx=tt[d];sy=tt[d+1];ex=tt[d+2];ey=tt[d+3];
                rx=(ex-sx)/3;ry=(ey-sy)/3;
                
                d=b*6;
                tt2[d]=sx;tt2[d+1]=sy;
                e=(rand()-0.5)*bai;
                tt2[d+2]=sx+rx-ry*e;tt2[d+3]=sy+ry+rx*e;
                e=(rand()-0.5)*bai;
                tt2[d+4]=sx+rx*2-ry*e;tt2[d+5]=sy+ry*2+rx*e;
                
            }
            tt2[tt2.length-2]=tt[tt.length-2];
            tt2[tt2.length-1]=tt[tt.length-1];
        }
        
        ctx.beginPath();
        ctx.moveTo(tt2[0],tt2[1]);
        
        for(a=2;a<tt2.length;a+=2)ctx.lineTo(tt2[a],tt2[a+1]);
        
        for(a=0;a<7;a++){
            ctx.lineWidth=haba;
            ctx.stroke();
            haba*=0.6;
        }
    }
    
    function gyar2(r){
        var a;
        ctx.fillStyle=ctx.strokeStyle="hsla("+((360*rand())|0)+",60%,60%,0.07)";
        r*=3;
        b=0.8;
        for(a=0;a<5;a++){
            gya2(b,r,a);
            b*=0.96;
        }
    }
    
    function gya2(lim,r,s){
        var a,b,c,x,y,x2,y2,st,ed,len,han,han2,haba,st2,ed2,rad,ks,z;
        len=stmax;
        ed=0;
        
        ks=(stmax/10)|0;
        
        for(z=0;z<1000000;z++){
            for(st=ed;st<len;st++)if(nami[(st+r)%stmax]>lim)break;
            for(ed=st;ed<len;ed++)if(nami[(ed+r)%stmax]<=lim)break;
            
            ctx.beginPath();
            
            st2=st/len;st2*=st2;st2*=st2*st2*300;
            ed2=ed/len;ed2*=ed2;ed2*=ed2*ed2*300;
            
            han=(st2+ed2)/2*gbai;
            haba=(ed2-st2)*gbai;
            ctx.lineWidth=haba;
            
            ctx.arc(gtx,gty,han,0,Math.PI*2,false);
            
            ctx.stroke();
            
            if(haba>0.5 && !s && han<200){
                rad=r+(han*10)|0;
                han2=han*1.1;
                for(a=0;a<10;a++){
                    sx=ctank[rad%stmax]*han2+gtx;
                    ex=ctank[(rad+ks)%stmax]*han2+gtx;
                    sy=stank[rad%stmax]*han2+gty;
                    ey=stank[(rad+ks)%stmax]*han2+gty;
                    ina(sx,sy,ex,ey,1.5,4);
                    rad+=ks;
                }
            }
            if(ed>=len)break;
        }
    }
    
    function gyar(r){
        var a;
        ctx.fillStyle=ctx.strokeStyle="hsla("+((360*rand())|0)+",60%,60%,0.07)";
        r*=3;
        b=0.8;
        for(a=0;a<10;a++){
            gya(b,r);
            b*=0.92;
        }
    }
    
    function gya(lim,r){
        var a,b,c,x,y,x2,y2,st,len,z;
        
        len=stmax;
        for(ed=0;ed<len;ed++)if(nami[ed]<=lim)break;
        
        for(z=0;z<1000000;z++){
            for(st=ed;st<len;st++)if(nami[st]>lim)break;
            b=st+stmax/4;
            for(ed=st;ed<b;ed++)if(nami[ed%stmax]<=lim)break;
            
            ctx.beginPath();
            x=ctank[(st+r)%stmax]*400*gbai+gtx;y=stank[(st+r)%stmax]*400*gbai+gty;
            x2=ctank[(ed+r)%stmax]*400*gbai+gtx;y2=stank[(ed+r)%stmax]*400*gbai+gty;
            ctx.moveTo(x,y);ctx.lineTo(gtx,gty);ctx.lineTo(x2,y2);
            ctx.fill();
            if(ed>=len)break;
        }
    }
    
    function noize1(val,p){
        var i,r1,r2,len,p0,p1,p2,x0,x1;
        i=val|0;r1=val-i;r2=1-r1;len=p.length;
        p0=p[i%len];p1=p[(i+1)%len];p2=p[(i+2)%len];
        x0=(p0+p1)/2;x1=(p1+p2)/2;
        return (x0*r2+p1*r1)*r2+(p1*r2+x1*r1)*r1;
    }
}

function mbl(){
    var a,b,mtank,gtx,gty;
    mtank=new Float32Array(canvas.width*canvas.height*3);
    count=0;
    b=15+(rand()*6)|0;
    for(a=0;a<b;a++)cpl();
    ctx.putImageData(gim,0,0);
    
    function cpl(){
        var a,b,c,d,x,y,z,x1,y1,dt,mt,rx,ry,ch,step,step2,iti,at;
        ch=(count%6===0);
        if(ch){
            gtx=(rand()-0.5)*1.8-0.5;
            gty=(rand()-0.5)*1.8;
        }
        step=1/300/gbai;
        mt=mtank;
        dt=gim.data;
        count++;
        ry=gty-step*canvas.height/2;
        iti=at=0;
        for(a=0;a<canvas.height;a++){
            rx=gtx-step*canvas.width/2;
            for(b=0;b<canvas.width;b++){
                x=mt[at];y=mt[at+1];
                if(ch){
                    x*=0.15;y*=0.15;
                }
                x1=x*x-y*y+rx;
                y1=2*x*y+ry;
                z=1/(x1*x1+y1*y1+0.2);
                x1*=z;y1*=z;
                d=mt[at+2]*0.9;
                c=Math.abs(x1*x1-y1*y1);
                if(c<0.1)d+=(0.1-c)*2500;
                mt[at]=x1;
                mt[at+1]=y1;
                mt[at+2]=d;
                c=d|0;
                dt[iti+2]=c&256;
                dt[iti]=dt[iti+1]=c;
                at+=3;
                iti+=4;
                rx+=step;
            }
            ry+=step;
        }
    }
}

function kum(){
    var a,b,c,d,e,x,y,max,rectank,hen,N;
    N=12;
    hen=15+15*rand();
    hen*=gbai;
    iso=rand()*Math.PI*2;
    e={x:gtx,y:gty,sr:0,er:N,han:0};
    rectank=[];
    for(b=0;b<2400;b++){
        e=a=ttt2(e,rectank);
        a.st=1;
        max=1000000;
        for(c=0;c<1000000;c++){
            if(a.han<max){
                max=a.han;
                e=a;
            }
            a=a.tugi;
            if(a.st){
                a.st=0;
                break;
            }
        }
    }
    e.st=1;
    for(b=0;b<100000;b++){
        c=e.tugi;
        e.mae=0;
        e.tugi=0;
        e=c;
        if(e.st)break;
    }
    
    ctx.fillStyle=setgrd2((rand()*360)|0,rand()*1000);
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=setgrd2((rand()*360)|0,rand()*1000);
    
    for(a=0;a<rectank.length;a++){
        c=rectank[a];
        ctx.beginPath();
        for(b=0;b<4;b++)ctx.lineTo(c[b][0],c[b][1]);
        ctx.fill();
    }
    
    function ttt2(ob,rc){
        var a,b,c,d,e,p,x,y,bai,p1,p2,o,k,tx,ty,sr,er,z,n2,err1;
        tx=ob.x;
        ty=ob.y;
        sr=ob.sr;
        er=ob.er;
        n2=N/2;
        e=(er-sr)%N;
        if(e<0)e+=N;
        b=sr;
        
        if(ob.mae && (e%N===0)){
            a=ob.mae;
            c=ob.tugi;
            b=ob.tugi.tugi;
            a.tugi=b;
            a.er=(b.sr+n2)%N;
            b.mae=a;
            
            ob.mae=0;
            ob.tugi=0;
            c.mae=0;
            c.tugi=0;
            
            return a;
        }
        
        if(e===0)e+=N;
        
        if(e>6){
            p=ranset(e);
        }else if(e==6){
            p=[2,1,3];
        }else if(e==5){
            p=[5];
            if(rand()<0.3)p=[2,3];
        }else{
            p=[e];
        }
        
        for(z=0;z<100;z++){
            err1=0;
            if(ob.mae && p.length>=2){
                a=ob.mae;
                a=(a.er-a.sr+24)%12;
                b=6-p[0];
                if(a<b){
                    err1=1;
                }
                a=ob.tugi;
                a=(a.er-a.sr+24)%12;
                b=6-p[p.length-1];
                if(a<b){
                    err1=1;
                }
            }
            if(!err1)break;
            p=ranset(e);
        }
        
        
        p1=[];
        p2=[];
        bai=Math.PI*2/N;
        
        b=sr;
        for(a=0;a<p.length;a++){
            x=Math.cos(b*bai)*hen;
            y=Math.sin(b*bai)*hen;
            
            p1.push([x,y]);
            c=Math.cos(p[a]/2*bai)*hen*2;
            d=b+p[a]/2;
            x=Math.cos(d*bai)*c;
            y=Math.sin(d*bai)*c;
            p2.push([x,y]);
            b+=p[a];
        }
        
        x=Math.cos(b*bai)*hen;
        y=Math.sin(b*bai)*hen;
        p1.push([x,y]);
        
        for(a=0;a<p1.length-1;a++){
            b=p1[a];
            c=p2[a];
            d=p1[a+1];
            rc.push(
                [
                    [b[0]/2+tx,b[1]/2+ty],
                [(b[0]+c[0])/2+tx,(b[1]+c[1])/2+ty],
                [(d[0]+c[0])/2+tx,(d[1]+c[1])/2+ty],
                    [d[0]/2+tx,d[1]/2+ty]
                    ]
                    );
        }
        
        k=[];
        b=sr;
        for(a=0;a<p.length;a++){
            k.push((b+p[a])%N);
            b+=p[a];
            k.push((b-p[a]+n2)%N);
        }
        
        o=[];
        for(a=0;a<p.length*2;a++){
            if(a%2===0){
                b=p1[a/2];
            }else{
                b=p2[(a/2)|0];
            }
            
            c={
                x:b[0]+tx,
                y:b[1]+ty,
                er:k[a]
            };
            x=c.x-gtx;
            y=c.y-gty;
            c.han=Math.pow(x*x+y*y,0.5);
            o.push(c);
        }
        
        for(a=0;a<o.length;a++){
            c=o[a];
            if(a){
                c.mae=o[a-1];
                c.sr=(o[a-1].er+n2)%N;
            }
            if(a<o.length-1)c.tugi=o[a+1];
        }
        
        if(!ob.mae){
            a=o[0];
            b=o[o.length-1];
            a.mae=b;
            a.sr=(b.er+n2)%N;
            b.tugi=a;
        }else{
            a=o[0];
            b=o[o.length-1];
            c=ob.mae.mae;
            d=ob.tugi;
            a.mae=c;
            a.sr=(c.er+n2)%N;
            c.tugi=a;
            b.tugi=d;
            d.mae=b;
            d.sr=(b.er+n2)%N;
        }
        
        ob.mae=0;
        ob.tugi=0;
        return o[0];
    }
    
    function ranset(e){
        var a,b,c,d,p,n2;
        n2=N/2;
        if(e==1){
            return [1];
        }else if(e==2){
            if(rand()<0.5)return [2];
            return [1,1];
        }
        
        p=[];
        a=e;
        for(var zz=0;zz<10000;zz++){
            b=((rand()*n2)|0)+1;
            if(b>a)b=a;
            p.push(b);
            a-=b;
            if(a<=0)break;
        }
        
        for(a=0;a<p.length;a++){
            b=(rand()*p.length)|0;
            c=p[a];p[a]=p[b];p[b]=c;
        }
        return p;
    }
}

function jur(){
    var a,b,c,x,y,xx,yy,x2,y2,xy2,z,tx,ty,costank,
        max,col,hm,step,rx,ry,iti,kai,hige,imd;
    
    costank=new Float32Array(10000);
    for(a=0;a<10000;a++){
        b=a/10000;
        b=1-b;
        b=0.5-Math.cos(b*Math.PI)/2;
        costank[a]=b;
    }
    
    b=Math.sin(tim/11)+Math.sin(tim/19);
    c=Math.cos(tim/7)+Math.sin(tim/23);
    tx=Math.cos(tim/13)*b*0.4;
    ty=Math.sin(tim/13)*c*0.4;
    zoom=200+Math.sin(tim/17)*100;
    hm=0.05+Math.sin(tim/47)*0.03;
    max=9;
    rx=tx;ry=ty;
    imd=gim.data;
    step=1/zoom/gbai;
    tx=-step*(canvas.width/2);
    ty=-step*(canvas.height/2);
    iti=0;
    xx=tx;
    col=[];
    c=0;
    for(a=0;a<5;a++){
        col[a]=[];
        for(b=0;b<8;b++){
            col[a][b]=300+Math.sin(tim/53*(a+1)*(b+1))*280;
        }
    }
    
    for(a=0;a<canvas.height;a++){
        tx=xx;
        for(b=0;b<canvas.width;b++){
            x=tx;y=ty;x2=x*x;y2=y*y;xy2=x*y*2;
            for(kai=0;kai<max;kai++){
                x=x2-y2+rx;
                y=xy2+ry;
                x=Math.abs(x);y=Math.abs(y);
                z=1/(x*x+y*y+0.05);
                x*=z;y*=z;
                x2=x*x;y2=y*y;xy2=x*y*2;
                if(kai>=4){
                    hige=Math.abs(x2-y2);
                    if(hige<hm)break;
                }
            }
            
            if(kai!=max){
                c=kai-4;
                hige=costank[(hige/hm*costank.length)|0];
                col1=(col[c][0]*hige)|0;
                col2=(col[c][1]*hige)|0;
                col3=(col[c][2]*hige)|0;
            }else{
                col1=col2=col3=0;
            }
            imd[iti]=col1>255?255:col1;
            imd[iti+1]=col2>255?255:col2;
            imd[iti+2]=col3>255?255:col3;
            iti+=4;
            tx+=step;
        }
        ty+=step;
    }
    ctx.putImageData(gim,0,0);
}

function curi(){
    var a,b,c,d,e,x,y,r,cbai;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    
    cbai=0.1+rand()*0.6;
    
    c=[];
    r=tim/32;
    for(a=0;a<14;a++){
        b=400;
        if(a%2==1)b=260;
        x=Math.cos(r)*b*gbai;
        y=Math.sin(r)*b*gbai;
        c.push([gtx+x,gty+y]);
        r+=Math.PI*2/14;
    }
    
    for(a=0;a<7;a++){
        b=c[a*2];
        d=c[a*2+1];
        e=c[(a*2+13)%14];
        tri([[gtx,gty],b,d],0);
        tri([[gtx,gty],b,e],0);
    }
    
    ctx.globalCompositeOperation = "source-over";
    
    function tri(p,ban){
        var a,b,c,d,e,f,x,y,han,r1,r2;
        x=y=0;
        for(a=0;a<3;a++){
            x+=p[a][0];
            y+=p[a][1];
        }
        x=x/3-canvas.width/2;
        y=y/3-canvas.height/2;
        han=Math.pow(x*x+y*y,0.5);
        c=0.2+Math.sin(tim/13)*0.15;
        r1=0.6+Math.sin(han/20*(1+Math.sin(tim/19)*0.7)+tim/41)*c;
        r2=1-r1;
        c=p[0][0]*(p[1][1]-p[2][1]);
        c+=p[1][0]*(p[2][1]-p[0][1]);
        c+=p[2][0]*(p[0][1]-p[1][1]);
        c=Math.abs(c);
        
        if(c<1000){
            if(ban%5==1){
                a=((han*cbai+tim*3)%360)|0;
                b=0.6;
                if(ban%11>8)b=1;
                ctx.fillStyle=ctx.strokeStyle="hsla("+a+",60%,60%,"+b+")";
                ctx.beginPath();
                for(a=0;a<p.length;a++){
                    b=p[a];
                    ctx.lineTo(b[0],b[1]);
                }
                ctx.fill();
                if(rand()<0.3)return;
            }
            if(ban%11>8)return;
            if(c<20)return;
        }
        
        d=0;
        for(a=0;a<p.length;a++){
            b=p[a];
            c=p[(a+1)%p.length];
            x=b[0]-c[0];
            y=b[1]-c[1];
            e=Math.pow(x*x+y*y,0.5);
            if(e>d){
                d=e;
                f=a;
            }
        }
        
        a=p[f];
        b=p[(f+1)%p.length];
        c=p[(f+2)%p.length];
        x=a[0]*r1+b[0]*r2;
        y=a[1]*r1+b[1]*r2;
        tri([b,c,[x,y]],ban+1);
        tri([c,a,[x,y]],ban+4);
    }
}

function mav(){
    var mf,abs,gratank,stank,ctank,kurotank,powtank,count,
        xp,yp,rxp,ryp,px,py,rpx,rpy,sokudo;
    var a,b,c,x,y,col;
    mf=Math.floor;
    abs=Math.abs;
    
    count=tim|0;
    
    col=[];
    c=[];
    b=20;
    for(a=0;a<3;a++){
        c[a]=b;
        b*=1.4+rand();
    }
    
    for(a=0;a<3;a++){
        d=(rand()*3)|0;
        b=c[a];c[a]=c[d];c[d]=b;
    }
    
    
    for(a=0;a<4;a++){
        col[a]=[];
        for(b=0;b<3;b++)col[a][b]=(c[b]|0);
        for(b=0;b<3;b++){
            c[b]*=(1+rand()*2);
        }
    }
    
    for(a=0;a<col.length;a++){
        c=(rand()*col.length)|0;
        b=col[a];col[a]=col[c];col[c]=b;
    }
    
    gratank=[];
    for(a=0;a<1000;a++)gratank[a]=gra1(a/1000,col);
    stank=[];ctank=[];
    for(a=0;a<10000;a++){
        stank[a]=Math.sin(a/10000*Math.PI*2);
        ctank[a]=Math.cos(a/10000*Math.PI*2);
    }
    
    kurotank=[];
    for(a=0;a<10000;a++){
        b=a/10000;
        c=(b*40-0.5)%2;
        c=Math.cos(c*Math.PI)*0.5;
        c*=0.5-Math.cos(b*Math.PI)*0.5;
        kurotank[a]=c+b;
    }
    powtank=[];
    for(a=0;a<600;a++){
        powtank[a]=new Float32Array(600);
        for(b=0;b<600;b++){
            y=a/2;x=b/2;
            c=Math.pow(x*x+y*y,0.1);
            if(!c)c=1;c=1.1/c;
            powtank[a][b]=c;
        }
    }
    
    xp=80+rand()*40;yp=80+rand()*40;px=20+rand()*20;py=20+rand()*20;
    mv(gim);
    ctx.putImageData(gim,0,0);
    
    function mv(ime){
        var a,b,c,d,r,x,y,x1,y1,x2,y2,iti,imd,cou,st,ct,pt,kt,gt;
        st=stank;ct=ctank;pt=powtank;kt=kurotank;gt=gratank;
        imd=ime.data;
        cou=(count%kt.length)*2;
        
        
        iti=0;
        for(a=0;a<canvas.height;a++){
            for(b=0;b<canvas.width;b++){
                x1=b-gtx;y1=a-gty;
                for(c=0;c<5;c++){
                    x2=mf(x1*xp)%10000;if(x2<0)x2+=10000;
                    y2=mf(y1*yp)%10000;if(y2<0)y2+=10000;
                    x=x1+ct[y2]*px;
                    y=y1+st[x2]*py;
                    d=x;x=y;y=d;
                    x1=400-x;
                    y1=y;
                }
                
                y=mf(abs(y*2));if(y>=600)y=599;
                x=mf(abs(x*2));if(x>=600)x=599;
                c=pt[y][x];
                
                d=mf(c*kt.length);
                d=d%kt.length;
                if(d<0)d+=kt.length;
                c=kt[d];
                
                c=Math.floor(c*1000)+cou;
                c=c%1000;
                if(c<0)c+=1000;
                c=gt[c];
                
                imd[iti]=c[0];
                imd[iti+1]=c[1];
                imd[iti+2]=c[2];
                iti+=4;
            }
        }
    }
    
    function gra1(atai,col){
        var a,b,c;
        atai=atai%1;
        if(atai<0)atai+=1;
        atai*=col.length;
        
        a=atai%1;
        a=0.5-Math.cos(a*Math.PI)/2;
        b=1-a;
        c=Math.floor(atai)%col.length;
        d=(c+1)%col.length;
        
        c1=col[c][0]*b+col[d][0]*a;
        c2=col[c][1]*b+col[d][1]*a;
        c3=col[c][2]*b+col[d][2]*a;
        return [mf(c1),mf(c2),mf(c3)];
    }
}