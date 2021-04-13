import {Orders} from '../../../orders/orders.entity';
import {User} from '../../../users/user.entity';


export class OrderHelper{
    private _data : Orders[];

    constructor (user : User[]){
        this._data = this.getData(user);
    }

    private getData(user: User[]) : any[]{
        return[
            Orders.create({
                    //id_user: user.filter(a =>a.id === 4),
                    //name: user.filter(a =>a.name==='Juwan Beatty'),
                    //phone: user.filter(a =>a.phone==='351.651.4614 x345'),
                    //address: user.filter(a =>a.address==='Port Darrin'),
                    //totalMoney: 30000000,
                    //productOrder: [
                      //  {
                        //    id_product: 1,
                         //   quantity: 12
                        //}, {
                          //  id_product: 2,
                            //quantity: 12
                        //}]
                
            })
        ];
    }

    public initOrder(): Promise<Orders[]> {
        return Promise.all(this._data.map(order => order.save()));
      }
}