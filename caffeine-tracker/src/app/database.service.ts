import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Caf {
  post_id: number,
  productType: string,
  productName: string,
  caffeineAmount: number,
  date: Date
}
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  caffeine_log = new BehaviorSubject([]);
  
 
  constructor(private plt: Platform, 
    private sqlitePorter: SQLitePorter, 
    private sqlite: SQLite, 
    private http: HttpClient) {

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'caffeine_data.db',
        location: 'default'
      })
      
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
          console.log('database seeded');
      });
      
    });
  }
 
  seedDatabase() {
    this.http.get('caffeine_data.db', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadcaffeine_log();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getCafs(): Observable<Caf[]> {
    return this.caffeine_log.asObservable();
  }

  loadcaffeine_log() {
    return this.database.executeSql('Select * from caffeine_log', []).then(data => {
      let caffeine_logs: Caf[] = []; 

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          caffeine_logs.push({ 
            post_id: data.rows.item(i).post_id,
            productType: data.rows.item(i).productType, 
            productName: data.rows.item(i).productName, 
            caffeineAmount: data.rows.item(i).caffeineAmount,
            date: data.rows.item(i).date
           });
        }
      }
      this.caffeine_log.next(caffeine_logs);
    });
  }
  addCaffeineLog(productType, productName, caffeineAmount, date) {
    let data = [productType, productName, caffeineAmount, date];
    return this.database.executeSql(
      'INSERT INTO caffeine_log (productType, productName, caffeineAmount, date) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadcaffeine_log();
    });
  }
 
  getCaffeinelog(post_id): Promise<Caf> {
    return this.database.executeSql('SELECT * FROM caffeine_log WHERE post_id = ?', [post_id]).then(data => {
      return {
        post_id: data.rows.item(0).post_id,
        productType: data.rows.item(0).productType,
        productName: data.rows.item(0).productName,
        caffeineAmount: data.rows.item(0).caffeineAmount,
        date: data.rows.item(0).date
      }
    });
  }
 
  deleteCaffeineLog(post_id) {
    return this.database.executeSql('DELETE FROM caffeine_log WHERE post_id = ?', [post_id]).then(_ => {
      this.loadcaffeine_log();
    });
  }
  updateDeveloper(dev: Caf) {
    let data = [dev.productType, dev.productName, dev.caffeineAmount, dev.date];
    return this.database.executeSql(
      `UPDATE caffeine_log SET productType = ?, productName = ?, caffeineAmount, date = ? WHERE post_id = ${dev.post_id}`, data).then(data => {
      this.loadcaffeine_log();
    })
  }
}