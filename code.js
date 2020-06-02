const fs = require('fs');



let NPRBData = {};
fs.readFile('./tbsTable.json', (err, data) => {
    if (err) {
        console.log(err, "error");
    } else {
        NPRBData = JSON.parse(data);
    }
})

const generateTbsIndex = (type) => {
    let mcsIndex;
    let tbsIndex;

    switch (type) {
        case "QPSK": {
            mcsIndex = Math.floor((Math.random() * 10));
            tbsIndex = mcsIndex;
            return tbsIndex;
        }
        case "16QAM": {
            mcsIndex = Math.floor((Math.random() * 7) + 10);
            tbsIndex = mcsIndex - 1;
            return tbsIndex;
        }
        case "64QAM": {
            mcsIndex = Math.floor((Math.random() * 12) + 17);
            tbsIndex = mcsIndex - 2;
            return tbsIndex;
        }
        default:
            return type;
    }
}

const modulationType = (num) => {
    if (num > -65) {
        return "64QAM";
    } else if (num > -75) {
        return "16QAM";
    } else if (num > -85) {
        return "QPSK";
    } else {
        return "Out of range";
    }
}
module.exports = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.txt', (err, data) => {
            let withMimo = [];
            let withoutMimo = [];
            let sum=0;
            
            if (err) {
                console.log(err, "error");
                reject(err)
            } else {
                let values = data.toString().split(",");
                let finalAvg ={
                    withMimo:[],
                    withoutMimo:[]
                }
                values.map(num=>{
                    let type = modulationType(num);
                    let finalSum=0;
                    for(let i=0;i<15;i++){
                        let tbsIndex = generateTbsIndex(type);
                        let NprbValue = NPRBData[tbsIndex] || 0;
                        let Throughput = NprbValue * 1000;
                        finalSum+=Throughput;
                    
                    }
                    finalAvg.withMimo.push(finalSum/15);
                    finalAvg.withoutMimo.push((finalSum/15)*2);
                })
                
                let ThroughputValues = values.map(num => {
                    let type = modulationType(num);
                    let tbsIndex = generateTbsIndex(type);
                    let NprbValue = NPRBData[tbsIndex] || 0;
                    let Throughput = NprbValue * 1000;
                    withoutMimo.push(Throughput);
                    sum+=Throughput;
                    withMimo.push(Throughput * 2);
                    return [type, Throughput];
                });


                console.log('Throughput without MIMO tech');
                ThroughputValues.forEach(Throughput => {
                    console.log(Throughput[0] + '       ' + Throughput[1]);// Throughput[0] is the modualtion type ie 64 or 16 or QPSK and Throughput[1] is actual value of throughout
                });

                console.log('Using MIMO 2*2 technology');
                ThroughputValues.forEach(Throughput => {
                    console.log(Throughput[0] + '       ' + Throughput[1] * 2);

                });
                let wotavg=sum/50;
                let wtavg=wotavg*2;
                console.log(finalAvg);
                let allData={
                    throughput:[withoutMimo, withMimo],
                    wotavg,wtavg,
                    finalAvg:[finalAvg.withoutMimo,finalAvg.withMimo]
                }
                console.log(wotavg+'\n'+wtavg);
                resolve(allData);
                

            }
        })
    })

}
