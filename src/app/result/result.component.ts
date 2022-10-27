import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private http:HttpClient) { }
  csv_data:any;
	chartOptions:any;
	load = false;
  ngOnInit(): void {
		let api_url = "http://127.0.0.1:5000/api/get_csv";
		this.http.get(api_url,{responseType:"text"}).subscribe((res)=>{
			this.csv_data = res;
			console.log(this.csv_data);
			this.pass_param();
			this.load = true;
		});
  }
  getDataPointsFromCSV(csv:any, col:number) {                       //https://canvasjs.com/docs/charts/how-to/create-charts-from-csv/
    let dataPoints =[];
		let csvLines = [];
		let points = [];
    let date = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);       
    for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(",");
            date = points[0].split("-");
            dataPoints.push({ 
              x: new Date(date[0],date[1]-1),  //month starts from 0 . so only there is -1
              y: parseInt(points[col]) 		
				});
		}
		return dataPoints;
	}
	
	pass_param(){
		this.chartOptions = {                              //https://canvasjs.com/angular-charts/multi-series-chart/
      animationEnabled: true,
			zoomEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "Predicted Graph"
			},
      axisX: {                                          //https://canvasjs.com/docs/charts/methods/canvasjs/format-date/
        labelFormatter: function (e:any) {
          return CanvasJS.formatDate( e.value, "MMM YY"); 
        },
        labelAngle: -20
      }, 
      axisY:{
        title: "Sales"
      },
			data: [{
				type: "line",
        color:"orange",
        showInLegend: true,
		    name: "Actual Sales",
		    dataPoints: this.getDataPointsFromCSV(this.csv_data, 1)
			},{
        type: "line",
        color:"blue",
        showInLegend: true,
        name: "Predicted Sales",
        dataPoints: this.getDataPointsFromCSV(this.csv_data, 2)
      }]
		}
	}
}
