import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  getDataPointsFromCSV(csv:any) {
    let dataPoints =[]
		let csvLines = []
		let points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);    
    for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(",");
            dataPoints.push({ 
                x: points[0], 
                y: parseFloat(points[1]) 		
				});
		}
			return dataPoints;
	}
	generateRandomData = () => {
		var y  = 1000, dps = [];
		for(var i = 0; i < 1000; i++) {
			y += Math.ceil(Math.random() * 10 - 5);
			dps.push({ y: y});
		}
		return dps;
	}

	pass_param(){
		this.chartOptions = {
			zoomEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "Try Zooming & Panning"
			},
			data: [{
				type: "line",
				dataPoints: this.getDataPointsFromCSV(this.csv_data)
				// dataPoints : this.generateRandomData()
			}]
		}
	}
}
