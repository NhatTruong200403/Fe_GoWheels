<template>
    <div>
        <h3>{{ monthName }} {{ year }}</h3>
        <div class="calendar-grid">
            <div v-for="dateObj in dates" :key="dateObj.date"
                :class="{ disabled: dateObj.disabled, selected: dateObj.isSelected }" @click="selectDate(dateObj.date)">
                {{ dateObj.date.getDate() }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        month: Number,
        year: Number,
        bookingData: Object,
        startDate: Date,
        endDate: Date
    },
    data() {
        return {
            dates: []
        };
    },
    computed: {
        monthName() {
            return new Date(this.year, this.month).toLocaleString('default', { month: 'long' });
        }
    },
    mounted() {
        this.generateDates();
    },
    methods: {
        generateDates() {
            const firstDate = new Date(this.year, this.month, 1);
            const lastDate = new Date(this.year, this.month + 1, 0);
            const today = new Date();

            let dates = [];
            for (let day = firstDate.getDate(); day <= lastDate.getDate(); day++) {
                let date = new Date(this.year, this.month, day);
                let isDisabled = date < today || this.isDateWithinBooking(date);
                let isSelected = (this.startDate && this.startDate.toDateString() === date.toDateString()) ||
                    (this.endDate && this.endDate.toDateString() === date.toDateString());
                dates.push({ date, disabled: isDisabled, isSelected });
            }
            this.dates = dates;
        },
        isDateWithinBooking(date) {
            return Object.values(this.bookingData).some(({ startLimit, endLimit }) => date >= startLimit && date <= endLimit);
        },
        selectDate(date) {
            if (!date.disabled) {
                this.$emit('dateSelected', date);
            }
        }
    }
}
</script>

<style>
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.disabled {
    color: #aaa;
    pointer-events: none;
}

.selected {
    background-color: #4CAF50;
    color: white;
}
</style>




availableHours: {
0: { value: 0, name: "00:00", disabled: false },
1: { value: 0.5, name: "00:30", disabled: false },
2: { value: 1, name: "01:00", disabled: false },
3: { value: 1.5, name: "01:30", disabled: false },
4: { value: 2, name: "02:00", disabled: false },
5: { value: 2.5, name: "02:30", disabled: false },
6: { value: 3, name: "03:00", disabled: false },
7: { value: 3.5, name: "03:30", disabled: false },
8: { value: 4, name: "04:00", disabled: false },
9: { value: 4.5, name: "04:30", disabled: false },
10: { value: 5, name: "05:00", disabled: false },
11: { value: 5.5, name: "05:30", disabled: false },
12: { value: 6, name: "06:00", disabled: false },
13: { value: 6.5, name: "06:30", disabled: false },
14: { value: 7, name: "07:00", disabled: false },
15: { value: 7.5, name: "07:30", disabled: false },
16: { value: 8, name: "08:00", disabled: false },
17: { value: 8.5, name: "08:30", disabled: false },
18: { value: 9, name: "09:00", disabled: false },
19: { value: 9.5, name: "09:30", disabled: false },
20: { value: 10, name: "10:00", disabled: false },
21: { value: 10.5, name: "10:30", disabled: false },
22: { value: 11, name: "11:00", disabled: false },
23: { value: 11.5, name: "11:30", disabled: false },
24: { value: 12, name: "12:00", disabled: false },
25: { value: 12.5, name: "12:30", disabled: false },
26: { value: 13, name: "13:00", disabled: false },
27: { value: 13.5, name: "13:30", disabled: false },
28: { value: 14, name: "14:00", disabled: false },
29: { value: 14.5, name: "14:30", disabled: false },
30: { value: 15, name: "15:00", disabled: false },
31: { value: 15.5, name: "15:30", disabled: false },
32: { value: 16, name: "16:00", disabled: false },
33: { value: 16.5, name: "16:30", disabled: false },
34: { value: 17, name: "17:00", disabled: false },
35: { value: 17.5, name: "17:30", disabled: false },
36: { value: 18, name: "18:00", disabled: false },
37: { value: 18.5, name: "18:30", disabled: false },
38: { value: 19, name: "19:00", disabled: false },
39: { value: 19.5, name: "19:30", disabled: false },
40: { value: 20, name: "20:00", disabled: false },
41: { value: 20.5, name: "20:30", disabled: false },
42: { value: 21, name: "21:00", disabled: false },
43: { value: 21.5, name: "21:30", disabled: false },
44: { value: 22, name: "22:00", disabled: false },
45: { value: 22.5, name: "22:30", disabled: false },
46: { value: 23, name: "23:00", disabled: false },
47: { value: 23.5, name: "23:30", disabled: false },
},



// disabledDates() {
// const disabled = [];
// const today = new Date();
// today.setHours(0, 0, 0, 0);

// // Thêm các ngày đã qua
// let currentDate = new Date(today);
// currentDate.setDate(1);

// while (currentDate < today) { // disabled.push(new Date(currentDate).format()); //
    currentDate.setDate(currentDate.getDate() + 1); // } // // Thêm ngày trong booking //
    Object.values(this.booking).forEach(({ startLimit, endLimit })=> {
    // let bookingStartDate = new Date(startLimit);
    // let bookingEndDate = new Date(endLimit);

    // while (bookingStartDate <= bookingEndDate) { // disabled.push(bookingStartDate.format()); //
        bookingStartDate.setDate(bookingStartDate.getDate() + 1); // } // }); // return disabled; // } //
        disabledDates() { // const disabled=[]; // const today=new Date(); // today.setHours(0, 0, 0, 0); // // Thêm các
        ngày đã qua // let currentDate=new Date(today); // currentDate.setDate(1); // while (currentDate < today) { //
        disabled.push(new Date(currentDate).format()); // currentDate.setDate(currentDate.getDate() + 1); // } // //
        Thêm ngày trong booking // Object.values(this.booking).forEach(({ startLimit, endLimit })=> {
        // let bookingStartDate = new Date(startLimit);
        // let bookingEndDate = new Date(endLimit);

        // // Kiểm tra xem ngày bắt đầu và ngày kết thúc có giống nhau không
        // if (bookingStartDate.getTime() === bookingEndDate.getTime()) {
        // disabled.push(bookingStartDate.format()); // Khóa ngày đó
        // } else {
        // // Chỉ khóa các ngày nằm giữa startLimit và endLimit
        // bookingStartDate.setDate(bookingStartDate.getDate() + 1); // Bắt đầu khóa từ ngày tiếp theo
        // while (bookingStartDate < bookingEndDate) { // disabled.push(bookingStartDate.format()); //
            bookingStartDate.setDate(bookingStartDate.getDate() + 1); // } // } // }); // return disabled; // } 





            // resultHourV2(type, hour, start) {
        //     switch (type) {
        //         case 'today&start':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value < hour + 2;
        //                 p.disabled = p.value < start + 2;  // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;
        //         case 'start&end':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value < start + 2;  // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;
        //         case 'start&end1':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value >= 12;
        //                 p.disabled = p.value < start + 2;   // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;
        //         case 'start&end2':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value <= 12;
        //                 p.disabled = p.value < start + 2;  // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;
        //         case 'today':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value < hour + 2; // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;
        //         case 'start':
        //             // Nếu là ngày bắt đầu booking, mở các giờ từ 0h đến giờ bắt đầu booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value >= 12; // Khóa các giờ từ giờ bắt đầu trở đi
        //             });
        //             break;

        //         case 'end':
        //             // Nếu là ngày kết thúc booking, mở các giờ sau giờ kết thúc booking
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = p.value <= 12; // Khóa các giờ từ 0h đến giờ kết thúc
        //             });
        //             break;

        //         case 'middle':
        //             // Nếu nằm giữa khoảng booking, khóa tất cả các giờ
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = true;
        //             });
        //             break;

        //         case 'free':
        //             // Nếu là ngày trống, mở tất cả các giờ
        //             Object.values(this.availableHours).forEach(p => {
        //                 p.disabled = false;
        //             });
        //             break;
        //     }
        // },

        // test








        // CheckHoursV2() {
        //     if (this.endDate == null) { this.open("Vui lòng chọn ngày kết thúc!"); }
        //     if (this.selectedStartTime == null) { this.open("Vui lòng chọn giờ ngày bắt đầu!"); }
        //     if (this.endDate != null && this.selectedStartTime != null) {
        //         const formattedNow = new Date(this.endDate);
        //         const formattedStart = new Date(this.startDate);
        //         const formattedNowDateString = formattedNow.toISOString().slice(0, 10);
        //         const formattedStartDateString = formattedStart.toISOString().slice(0, 10);
        //         const todaynow = new Date();
        //         const today = todaynow.toISOString().slice(0, 10)
        //         let isBooked = false; // Flag để kiểm tra ngày có nằm trong booking không

        //         // Đầu tiên reset tất cả các giờ về trạng thái false
        //         Object.values(this.availableHours).forEach(hour => {
        //             hour.disabled = false;
        //         });

        //         // Lặp qua các booking để kiểm tra
        //         Object.values(this.booking).forEach(e => {
        //             let bookingStartDate = new Date(e.startLimit);
        //             let bookingEndDate = new Date(e.endLimit);

        //             const bookingStartHour = bookingStartDate.getHours();
        //             const bookingEndHour = bookingEndDate.getHours();

        //             const bookingStartDateString = bookingStartDate.toISOString().slice(0, 10);
        //             const bookingEndDateString = bookingEndDate.toISOString().slice(0, 10);
        //             if (today === formattedNowDateString === formattedStartDateString) {
        //                 // Nếu trùng ngày bắt đầu booking
        //                 console.log('1');
        //                 isBooked = true;
        //                 this.resultHourV2('today&start', todaynow.getHours(), this.selectedStartTime);
        //                 return;
        //             }
        //             if (bookingStartDateString === formattedNowDateString === formattedStartDateString) {
        //                 // Nếu trùng ngày bắt đầu booking
        //                 console.log('3');
        //                 isBooked = true;
        //                 this.resultHourV2('start&end&bookingstart', bookingStartHour, this.selectedStartTime);
        //                 return;
        //             }
        //             if (bookingEndDateString === formattedNowDateString === formattedStartDateString) {
        //                 // Nếu trùng ngày bắt đầu booking
        //                 console.log('4');
        //                 isBooked = true;
        //                 this.resultHourV2('start&end&bookingend', bookingEndHour, this.selectedStartTime);
        //                 return;
        //             }
        //             if (formattedNowDateString === formattedStartDateString) {
        //                 console.log("formattedNowDateString: ",formattedNowDateString);
        //                 console.log("formattedStartDateString: ",formattedStartDateString);
        //                 console.log("bookingEndDateString: ",bookingEndDateString);
        //                 console.log("bookingStartDateString: ",bookingStartDateString);
        //                 // Nếu trùng ngày bắt đầu booking
        //                 console.log('2');
        //                 isBooked = true;
        //                 this.resultHourV2('start&end', this.selectedStartTime);
        //                 return;
        //             }
        //             if (bookingStartDateString === formattedNowDateString) {
        //                 // Nếu trùng ngày bắt đầu booking
        //                 console.log('5');
        //                 isBooked = true;
        //                 this.resultHourV2('start', bookingStartHour, 0);
        //                 return;
        //             }
        //             if (bookingEndDateString === formattedNowDateString) {
        //                 // Nếu trùng ngày kết thúc booking
        //                 console.log('6');
        //                 isBooked = true;
        //                 this.resultHourV2('end', bookingEndHour, 0);
        //                 return;
        //             }
        //             if (formattedNow > bookingStartDate && formattedNow < bookingEndDate) {
        //                 // Nếu nằm giữa khoảng booking
        //                 console.log('7');
        //                 isBooked = true;
        //                 this.resultHourV2('middle', 0, 0); // Khóa tất cả các giờ
        //                 return;
        //             }

        //             // if (bookingStartDateString === formattedNowDateString) {
        //             //     // Nếu trùng ngày bắt đầu booking
        //             //     isBooked = true;
        //             //     this.resultHour('start', bookingStartHour);
        //             //     return;
        //             // }
        //             // else if (bookingEndDateString === formattedNowDateString) {
        //             //     // Nếu trùng ngày kết thúc booking
        //             //     isBooked = true;
        //             //     this.resultHour('end', bookingEndHour);
        //             //     return;
        //             // }
        //             // else if (formattedNow > bookingStartDate && formattedNow < bookingEndDate) {
        //             //     // Nếu nằm giữa khoảng booking
        //             //     isBooked = true;
        //             //     this.resultHour('middle', 0); // Khóa tất cả các giờ
        //             //     return;
        //             // }
        //         });

        //         if (!isBooked) {
        //             // Nếu là ngày trống, mở tất cả các giờ
        //             this.resultHourV2('free', 0);
        //         }
        //     }
        // },