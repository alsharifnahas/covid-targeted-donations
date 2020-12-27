let myChart = document.getElementById('myChart').getContext('2d');
            let chart2 = document.getElementById('chart2').getContext('2d');

            let chart1 = new Chart(myChart, {
                
                type:'bar', // bar, horizontalBar, pie, line, doughnut, etc
                data:{
                    labels:['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets:[{
                        label: 'Confirmed U.S. Cases',
                        data:[
                            18,
                            196932,
                            1073216,
                            1791042,
                            2622225,
                            4521307,
                            5977153,
                            7168137,
                            9054023,
                            13463395,
                            18016698,
                        ],
                        backgroundColor: 'red',                      
                        borderWidth:1,
                        hoverBorderWidth:3,
                        hoverBorderColor: 'black',         
                    }]
                   
                },
                options:{
                    title:{
                        display:true,
                        text: 'COVID Statistics',
                        fontSize:25,
                    },
                layout:{
                    padding:{
                        left:100,
                        right:400,
                        bottom:100,
                        top:100,
                    }
                }
                }
                
            });
        

               let casPopChart = new Chart(chart2, {
                   type: 'bar',
                   data:{
                       labels:['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                       datasets:[{
                           label: 'Confirmed U.S. Deaths',
                           data:[
                               5,
                               4332,
                               59599,
                               100780,
                               120257,
                               145513,
                               175752,
                               199084,
                               222639,
                               259697,
                               314099,
                           ],
                           backgroundColor: 'red',
                       }]
                   },
                   options: {
                       title:{
                           display:true,
                           text: 'COVID Statistics',
                           fontSize:25,
                       },
                    layout:{
                        padding:{
                            left:100,
                            right:400,
                            bottom:100,
                            top:100,
                        }
                    }
                   }
               });