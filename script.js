function draw(){
    /*graph functions*/

    function fw0(w,x){
        return w/(1+x);
    }
    function fw1(w,x){
        return w*x;
    }
    function fw2(w,x){
        return ((100-x)*w)/100;
    }
    function fw3(w,x){
        return w*x;
    }
    function fw4(w,x){
        return w*x;
    }

    function draw(data){
        Plotly.newPlot('plot', data);
    }
    fw=[fw0,fw1,fw2,fw3,fw4];

    w=document.getElementsByClassName("w");
    e=document.getElementsByClassName("e");
    f=document.getElementsByClassName("f");
    v=document.getElementsByClassName("v");

    es=[];/*checks which parameters are enabled*/
    for(i=0;i<5;i++){
        if(e[i].checked)
            es[i]=1;
        else
            es[i]=0;
    }

    const min=-100;
    const max=100;
    const step=0.01;
    const pts=parseInt((max-min)/step);

    /*array of x coordinates*/
    const xVal=[];
    for(i=0;i<=pts;i++){
        xVal[i]=min+step*i;
    }

    /*arrays of y coordinates*/
    yVal0=[];
    yVal1=[];
    yVal2=[];
    yVal3=[];
    yVal4=[];
    yVal5=[];
    for(i=0;i<=pts;i++){
        if((min+step*i)!=-1)
            yVal0[i]=fw[0](w[0].value,xVal[i]);
        else 
            yVal0[i]=null;
    }
    for(i=0;i<=pts;i++){
        yVal1[i]=fw[1](w[1].value,xVal[i]);
    }
    for(i=0;i<=pts;i++){
        yVal2[i]=fw[2](w[2].value,xVal[i]);
    }
    for(i=0;i<=pts;i++){
        yVal3[i]=fw[3](w[3].value,xVal[i]);
    }
    for(i=0;i<=pts;i++){
        yVal4[i]=fw[4](w[4].value,xVal[i]);
    }

    /*array storing freeze values of functions*/
    fVal=[];
    for(i=0;i<5;i++){
        fVal[i]=fw[i](w[i].value,parseFloat(v[i].value));
    }
    
    yVal=[yVal0.slice(0,),yVal1.slice(0,),yVal2.slice(0,),yVal3.slice(0,),yVal4.slice(0,)];

    /*checks if freezed and if so then uses it instead*/
    for(i=0;i<5;i++){
        if(f[i].checked)
            for(j=0;j<=pts;j++)
                yVal[i][j]=fVal[i];
    }

    /*total heuristic yValues*/
    for(i=0;i<=pts;i++){
        if((min+step*i)!=-1)
            yVal5[i]=es[0]*yVal[0][i]+es[1]*yVal[1][i]+es[2]*yVal[2][i]+es[3]*yVal[3][i]+es[4]*yVal[4][i];
        else 
            yVal5[i]=null;
    }

    /*Plot information for each graph*/
    trc=[];
    trc[0] = {
        x: xVal,
        y: yVal0,
        type: 'scatter',
        name: "Pick before Time",
        line: {
            color: 'rgb(0, 128, 255)',
            width: 2
        }
    };
    trc[1] = {
        x: xVal,
        y: yVal1,
        type: 'scatter',
        name: "Rack Fulfillability",
        line: {
            color: 'rgb(255, 102, 51)',
            width: 2
        }
    };
    trc[2] = {
        x: xVal,
        y: yVal2,
        type: 'scatter',
        name: "Client Priority",
        line: {
            color: 'rgb(51, 204, 51)',
            width: 2
        }
    };
    trc[3] = {
        x: xVal,
        y: yVal3,
        type: 'scatter',
        name: "Distance",
        line: {
            color: 'rgb(214, 41, 0)',
            width: 2
        }
    };
    trc[4] = {
        x: xVal,
        y: yVal4,
        type: 'scatter',
        name: "No. of Rack",
        line: {
            color: 'rgb(153, 0, 153)',
            width: 2
        }
    };
    if(e[0].checked==false || f[0].checked==true)
        trc[5] = {
            x: xVal,
            y: yVal5,
            type: 'scatter',
            name: "Total Heuristic",
            line: {
                color: 'rgb(0, 0, 102)',
                width: 2
            },
            connectgaps: true
        };

    else
        trc[5] = {
            x: xVal,
            y: yVal5,
            type: 'scatter',
            name: "Total Heuristic",
            line: {
                color: 'rgb(0, 0, 102)',
                width: 2
            }
        };

    trace=[];
    /*selects graphs to show based on enable*/
    for(i=0;i<5;i++)
        if(e[i].checked)
            trace.push(trc[i]);
    trace.push(trc[5]);
    data = trace;

    layout = {
        autosize: true,
        margin: {
            pad: 0,
        },
        legend: {
            traceorder: 'normal',
            font: {
                family: 'Josefin sans',
                size: 14,
                color: '#000'
            },
            bgcolor: '#E2E2E2'
        },
        xaxis: {
            title: "x",
            titlefont: { 
                    family: 'Courier New, monospace',
                    size: 30,
                    color: '#7f7f7f',
                },
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            range: [-50,50],
        },
        yaxis: {
            title: "y",
            titlefont: { 
                    family: 'Courier New, monospace',
                    size: 25,
                    color: '#7f7f7f',
                },
            linecolor: 'black',
            linewidth: 2,
            mirror: true,
            range: [-50,50],
        }
    };

    Plotly.newPlot('plot',data,layout);
}

form=document.getElementsByClassName('form');
for(i=0;i<5;i++){
    form[i].onsubmit = function(event) {
        event.preventDefault();
        draw();
    };
}
draw(); 