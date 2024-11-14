<template>
  
    <DetailBooking v-if="check == false" :id="id" @Close="Close"/>
    <table class="table"  v-else>
        <thead>
            <tr>
                <th>
                    xin chào bạn s
                </th>
                <th>Ngày nhận</th>
                <th>Ngày trả</th>
                <th></th>
            </tr>
        </thead>
        <tbody v-if="bookingPending != []">
            <tr v-for="item in bookingPending" :key="item.id">
                <td>
                    {{ item.post.name }}
                </td>
                <td>
                    {{ item.recieveOn }}
                </td>
                <td>
                    {{ item.returnOn }}
                </td>
                    
                    <li v-if="item.id">
                        <router-link :to="{ name: 'user-post-edit', params: { id: item.id } }">
                            <button>
                                Chỉnh sửa {{ item.id }}
                            </button>
                        </router-link>
                    </li>
                    <li v-if="item.id">
                        
                            <button @click="check = !check;id = item.id;">
                                Chi tiết {{ item.id }}
                            </button>
                       
                    </li>
                
                   
            
            </tr>

        </tbody>
        <tbody v-else>Danh sách trống</tbody>
        
    </table>
</template>

<script>
import BookingService from '../../../../Service/api/BookingService';
import DetailBooking from './DetailBooking.vue';
export default {
    components:{
        DetailBooking
    },
    data () {
    return {
        bookingPending:[],
        check: true,
        id:0
    }
  },
  methods: {
    Close(){
        this.check = true;
    },
    async CheckBooking(){
            this.checkBooking = !this.checkBooking;
            try{
                const response = await BookingService.GetAllPenDing();
                this.bookingPending = response.data;
                console.log(response.data);
            }
            catch(error){
                console.log("Lỗi lấy dữ liệu: ",error);
            }
            console.log("hehe",this.checkBooking);
        },
  },
  created () {
    this.CheckBooking();
  },
  

}
</script>

<style>

</style>