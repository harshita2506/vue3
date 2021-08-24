<template>

<div class="container-fluid">
    <div class="row ">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
                <p  class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none color-black">
                    <span class="fs-5 d-none d-sm-inline"><em class="fas fa-bars"></em></span>
                </p>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                    <li class="nav-item bg-light ">
                        <a  style="color:black" data-toggle="tab" data-bs-toggle="pill" class="nav-link align-middle px-0 ">
                           <em class="fas fa-th-large"></em> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" style="color:black" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                           <em class="fas fa-user"></em> <span class="ms-1 d-none d-sm-inline">Employess</span><span class="fas fa-caret-down"></span> </a>
                        <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100" @click="$router.push('/home/leaves')">
                                <a href="#" style="color:black" :active="true" class="nav-link px-0"><em class="fas fa-calendar-times"></em> <span class="d-none d-sm-inline">Leaves</span>  </a>
                            </li>
                            <li @click="$router.push('/home/payroll')">
                                <a href="#" style="color:black" class="nav-link px-0"><em class="fas fa-calendar-times"></em> <span class="d-none d-sm-inline">Payroll</span>  </a>
                            </li>
<li>
                                <a href="#"  style="color:black" class="nav-link px-0"><em class="fas fa-calendar-times"></em> <span class="d-none d-sm-inline">Attendance</span>  </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu2" style="color:black" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <em class="fas fa-list"></em> <span class="ms-1 d-none d-sm-inline">Supplies</span></a>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" style="color:black" class="nav-link px-0"> </a>
                            </li>
                            <li>
                                <a href="#" style="color:black" class="nav-link px-0"></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#submenu3" style="color:black" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <em class="fs-4 bi-grid"></em> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="#" style="color:black" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 1</a>
                            </li>
                            <li>
                                <a href="#" style="color:black" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 2</a>
                            </li>
                            <li>
                                <a href="#" style="color:black" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 3</a>
                            </li>
                            <li>
                                <a href="#" style="color:black" class="nav-link px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" style="color:black" class="nav-link px-0 align-middle">
                            <em class="fs-4 bi-people"></em> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                    </li>
                </ul>
                <hr>
                <!-- <div class="dropdown pb-4">
                    <a href="#" style="color:black" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <emmg src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> -->
            </div>
        </div>
        <div class="col py-3">
           <router-view />
        </div>
    </div>
</div>
</template>
<script></script>
<style>
.nav-link:active {
background-color: white;
color:'red';
}
</style>
