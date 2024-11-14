const employee = [{
    path : "/employee",
    component: () => import("../../Views/Views.vue"),
    meta: { requiresRole: "Employee" },
    children: [
        {
            path : "SubmitDriver",
            name: "employee-driver",
            component: ()=> import("../../Views/Employee/Views/SendSubmit/Submit.vue"),
        },
        {
            path : "SubmitDriverDetail/:id",
            name: "employee-driver-detail",
            component: ()=> import("../../Views/Employee/Views/SendSubmit/DetailDiver.vue"),
        },
    ]
}];
export default employee;