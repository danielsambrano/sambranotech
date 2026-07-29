const customers=[
  {id:1,name:"John Smith",initials:"JS",phone:"868-555-0147",email:"john.smith@example.com",address:"St. Augustine, Trinidad",units:2,last:"18 Jul 2026",next:"18 Jan 2027",status:"Active"},
  {id:2,name:"Maria Gomez",initials:"MG",phone:"868-555-0191",email:"maria.g@example.com",address:"Arima, Trinidad",units:3,last:"12 Jul 2026",next:"28 Jul 2026",status:"Due"},
  {id:3,name:"Anthony Williams",initials:"AW",phone:"868-555-0174",email:"anthony.w@example.com",address:"Chaguanas, Trinidad",units:1,last:"14 Jul 2026",next:"29 Jul 2026",status:"Due"},
  {id:4,name:"Patricia Ramcharan",initials:"PR",phone:"868-555-0133",email:"patricia.r@example.com",address:"San Fernando, Trinidad",units:4,last:"27 Jan 2026",next:"31 Jul 2026",status:"Active"},
  {id:5,name:"David Persad",initials:"DP",phone:"868-555-0162",email:"david.p@example.com",address:"Couva, Trinidad",units:2,last:"2 Feb 2026",next:"2 Aug 2026",status:"Active"},
  {id:6,name:"Kevin Sinanan",initials:"KS",phone:"868-555-0118",email:"kevin.s@example.com",address:"Tunapuna, Trinidad",units:1,last:"9 Feb 2026",next:"9 Aug 2026",status:"Active"}
];
const jobs=[
  ["JOB-1050","Maria Gomez","Split AC • Living Room","Scheduled","28 Jul • 9:00 AM"],
  ["JOB-1051","Anthony Williams","Window AC • Bedroom","Scheduled","28 Jul • 1:30 PM"],
  ["JOB-1043","John Smith","Split AC • On-site","In Progress","Technician: Ravi"],
  ["JOB-1046","Patricia Ramcharan","Cassette AC • Office","In Progress","Technician: Leah"],
  ["JOB-1042","David Persad","Mini Split • Completed","Completed","TT$1,200 paid"],
  ["JOB-1041","Kevin Sinanan","General servicing","Completed","TT$850 paid"],
  ["JOB-1038","Michael Lee","Service reminder","Follow-up Due","Overdue 3 days"],
  ["JOB-1032","Sharon Ali","Six-month service","Follow-up Due","Due today"]
];
const inventory=[
  ["R410A Refrigerant (11.3kg)","2","1","TT$900","TT$1,620","Low"],
  ["Capacitor 45/5 MFD","3","2","TT$25","TT$45","Low"],
  ["Fan Motor 1/6 HP","1","0","TT$120","TT$190","Low"],
  ["Contactors 30A","2","1","TT$45","TT$75","Low"],
  ["3M Dust Filter","8","2","TT$15","TT$28","Healthy"],
  ["PVC Drain Pipe ¾ inch","24","6","TT$12","TT$22","Healthy"]
];
const payments=[
  ["PAY-1078","Maria Gomez","INV-1023","28 Jul 2026","TT$1,200","Paid"],
  ["PAY-1077","David Persad","INV-1022","27 Jul 2026","TT$850","Paid"],
  ["PAY-1076","Patricia Ramcharan","INV-1021","26 Jul 2026","TT$2,450","Paid"],
  ["PAY-1075","John Smith","INV-1019","25 Jul 2026","TT$1,050","Paid"],
  ["PAY-1074","Anthony Williams","INV-1018","24 Jul 2026","TT$700","Paid"]
];
const state={view:"dashboard",lastFocus:null};
const $=s=>document.querySelector(s);
const money=n=>`TT$${n.toLocaleString()}`;
const statusClass=s=>s.toLowerCase().replaceAll(" ","-").replace("follow-up-due","soon");
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
const greeting=()=>{const hour=new Date().getHours();return hour<12?"Good morning":hour<18?"Good afternoon":"Good evening"};
const localDate=()=>new Intl.DateTimeFormat("en-TT",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date());
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2500)}
function button(text,action="demoAction()",secondary=false){return `<button class="${secondary?"secondary-btn":"primary-btn"}" onclick="${action}">${text}</button>`}
function pageHeading(title,subtitle,actions=""){return `<div class="section-heading"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="action-row">${actions}</div></div>`}
function stat(label,value,change){return `<article class="stat-card"><small>${label}</small><strong>${value}</strong><em>${change}</em></article>`}
function dashboard(){
 const due=customers.slice(1,6).map((c,i)=>`<div class="list-row"><div><strong>${c.name}</strong><small>${i%2?"Window AC • Bedroom":"Split AC • Living Room"}</small></div><small>${c.next}</small><span class="status ${i<2?"due":"soon"}">${i<2?"Due soon":`${i+1} days`}</span></div>`).join("");
 const bars=[35,47,42,58,53,69,63,82,76,94,88,100].map((h,i)=>`<div class="bar" style="height:${h}%"><span>W${i+1}</span></div>`).join("");
 return pageHeading("Good morning, Daniel","Here is what is happening with your business today.",button("+ New job","openNewJob()")+button("+ Customer","openNewCustomer()",true))+`<div class="stats-grid">${stat("Total customers","248","↑ 12 this month")}${stat("Due for service","18","5 require attention")}${stat("Jobs today","7","2 currently active")}${stat("Outstanding","TT$12,450","7 open invoices")}${stat("Monthly revenue","TT$48,750","↑ 14.2% vs June")}${stat("Estimated profit","TT$21,320","43.7% margin")}</div><div class="dashboard-grid"><article class="card"><div class="card-header"><h3>Services due</h3><button onclick="navigate('customers')">View all</button></div><div class="list">${due}</div></article><article class="card"><div class="card-header"><h3>Job status overview</h3><button onclick="navigate('jobs')">View jobs</button></div><div style="display:grid;place-items:center;height:190px"><div style="width:138px;height:138px;border-radius:50%;background:conic-gradient(#c79328 0 29%,#343434 29% 62%,#9da0a4 62% 86%,#e8d7ac 86%);display:grid;place-items:center"><div style="width:78px;height:78px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center"><strong style="font-size:1.3rem">42<small style="font-size:.55rem;display:block;color:#777">ACTIVE JOBS</small></strong></div></div></div></article><article class="card"><div class="card-header"><h3>Revenue trend (TT$)</h3><button onclick="navigate('reports')">This quarter</button></div><div class="chart">${bars}</div></article><article class="card"><div class="card-header"><h3>Low stock alerts</h3><button onclick="navigate('inventory')">View inventory</button></div>${inventory.slice(0,4).map(x=>`<div class="list-row"><div><strong>${x[0]}</strong><small>On hand: ${x[1]}</small></div><small>Allocated: ${x[2]}</small><span class="status low">Low</span></div>`).join("")}</article><article class="card span-2"><div class="card-header"><h3>Recent activity</h3><button>Today</button></div>${["Invoice INV-1023 was paid by Maria Gomez","New job JOB-1050 created for Maria Gomez","Quotation Q-108 accepted by Anthony Williams","Stock adjustment recorded for R410A Refrigerant","Payment received from Patricia Ramcharan"].map((x,i)=>`<div class="list-row"><div><strong>${x}</strong><small>${i+1} hour${i?"s":""} ago • Daniel Adams</small></div><small>${["TT$1,200","Scheduled","TT$700","-1 unit","TT$2,450"][i]}</small><span class="status ${i===3?"soon":"paid"}">${i===3?"Stock":"Recorded"}</span></div>`).join("")}</article></div>`;
}
function customersView(filter=""){
 const list=customers.filter(c=>`${c.name} ${c.phone} ${c.address}`.toLowerCase().includes(filter.toLowerCase()));
 return pageHeading("Customers","Search customer records, equipment and complete service history.",button("+ Add customer","openNewCustomer()"))+`<div class="filter-row"><input id="customerFilter" oninput="filterCustomers(this.value)" placeholder="Search name, phone or location" value="${filter}"><select><option>All customers</option><option>Service due</option><option>Active</option></select></div><div class="customer-grid">${list.map(c=>`<article class="customer-card"><header><div class="avatar">${c.initials}</div><div><h3>${c.name}</h3><p>${c.phone}</p></div></header><p>${c.address}</p><div class="customer-meta"><div><small>AC units</small><strong>${c.units}</strong></div><div><small>Next service</small><strong>${c.next}</strong></div></div><div class="customer-actions"><span class="status ${c.status==="Due"?"due":"paid"}">${c.status}</span><button class="link-btn" onclick="openCustomer(${c.id})">View profile →</button></div></article>`).join("")||"<p>No matching customers found.</p>"}</div>`;
}
function jobsView(){const columns=["Scheduled","In Progress","Completed","Follow-up Due"];return pageHeading("Jobs","Track every service from scheduling through completion and follow-up.",button("+ New job","openNewJob()"))+`<div class="filter-row"><select><option>All technicians</option><option>Ravi Singh</option><option>Leah Joseph</option></select><select><option>This week</option><option>Today</option><option>This month</option></select></div><div class="pipeline">${columns.map(col=>`<section class="pipe-column"><h4>${col}<span>${jobs.filter(j=>j[3]===col).length}</span></h4>${jobs.filter(j=>j[3]===col).map(j=>`<article class="job-card" onclick="toast('Opened ${j[0]}')"><strong>${j[0]} • ${j[1]}</strong><small>${j[2]}</small><small>${j[4]}</small></article>`).join("")}</section>`).join("")}</div>`}
function scheduleView(){const days=["27 Mon","28 Tue","29 Wed","30 Thu","31 Fri","1 Sat","2 Sun","3 Mon","4 Tue","5 Wed","6 Thu","7 Fri","8 Sat","9 Sun"];return pageHeading("Schedule","Coordinate appointments and technician availability.",button("+ Appointment","openNewJob()"))+`<div class="card"><div class="calendar">${days.map((d,i)=>`<div class="day ${i>4?"muted":""}"><strong>${d}</strong>${i<7?`<div class="appointment">${["Maria Gomez • 9:00","John Smith • 10:30","Anthony Williams • 1:30"][i%3]}</div>${i%2?'<div class="appointment">Site inspection • 3:00</div>':""}`:""}</div>`).join("")}</div></div>`}
function inventoryView(){return pageHeading("Inventory","Monitor stock, allocations, costs and selling prices.",button("+ Add stock","demoAction('Stock item form opened')")+button("Record movement","demoAction('Inventory movement form opened')",true))+`<article class="card"><div class="filter-row"><input placeholder="Search inventory"><select><option>All categories</option><option>Refrigerant</option><option>Electrical</option><option>Filters</option></select></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>On hand</th><th>Allocated</th><th>Cost price</th><th>Selling price</th><th>Status</th><th></th></tr></thead><tbody>${inventory.map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${x[4]}</td><td><span class="status ${x[5]==="Low"?"low":"paid"}">${x[5]}</span></td><td><button class="link-btn" onclick="demoAction('Inventory record opened')">View</button></td></tr>`).join("")}</tbody></table></div></article>`}
function quotesView(){return pageHeading("Quotes & Invoices","Create branded documents, convert accepted quotations and track balances.",button("+ New quotation","openQuote()")+button("+ New invoice","openQuote()",true))+`<div class="stats-grid">${stat("Open quotations","14","TT$18,620")}${stat("Accepted this month","9","TT$22,400")}${stat("Unpaid invoices","7","TT$12,450")}${stat("Overdue","3","TT$4,180")}${stat("Paid this month","31","TT$48,750")}${stat("Average invoice","TT$1,573","↑ TT$140")}</div><article class="card" style="margin-top:.8rem"><div class="table-wrap"><table class="data-table"><thead><tr><th>Document</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead><tbody>${[["INV-1023","Maria Gomez","28 Jul","TT$1,200","Paid"],["INV-1024","John Smith","28 Jul","TT$1,050","Pending"],["Q-0108","Anthony Williams","27 Jul","TT$700","Accepted"],["INV-1017","Michael Lee","20 Jul","TT$1,800","Overdue"],["Q-0107","Sharon Ali","19 Jul","TT$2,250","Pending"]].map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td><span class="status ${statusClass(x[4])}">${x[4]}</span></td><td><button class="link-btn" onclick="openQuote('${x[0]}')">Preview PDF</button></td></tr>`).join("")}</tbody></table></div></article>`}
function paymentsView(){return pageHeading("Payments","Record payments and monitor outstanding customer balances.",button("+ Record payment","demoAction('Payment form opened')"))+`<article class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Reference</th><th>Customer</th><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${payments.map(x=>`<tr>${x.map((v,i)=>`<td>${i===5?`<span class="status paid">${v}</span>`:v}</td>`).join("")}</tr>`).join("")}</tbody></table></div></article>`}
function reportsView(){return pageHeading("Reports","Understand revenue, estimated profitability and service performance.",button("Export report","demoAction('Report prepared for export')"))+`<div class="report-grid">${[["Monthly revenue","TT$48,750","78"],["Estimated gross profit","TT$21,320","44"],["Outstanding invoices","TT$12,450","26"],["Jobs completed","31","72"],["Repeat customers","68%","68"],["Inventory value","TT$37,840","61"]].map(x=>`<article class="card report-card"><small>${x[0]}</small><div class="metric">${x[1]}</div><div class="progress-track"><span style="width:${x[2]}%"></span></div><p style="color:#777;font-size:.7rem">Performance for July 2026</p></article>`).join("")}</div><article class="card" style="margin-top:.8rem"><div class="card-header"><h3>Revenue performance</h3><button>Last 12 weeks</button></div><div class="chart" style="height:260px">${[28,39,36,48,55,51,65,61,73,83,79,96].map((h,i)=>`<div class="bar" style="height:${h}%"><span>W${i+1}</span></div>`).join("")}</div></article>`}
function employeesView(){return pageHeading("Employees","Control access and monitor assigned work.",button("+ Invite employee","demoAction('Employee invitation form opened')"))+`<div class="customer-grid">${[["Daniel Adams","Owner","DA","Full access"],["Ravi Singh","Technician","RS","4 jobs assigned"],["Leah Joseph","Technician","LJ","3 jobs assigned"],["Alicia James","Office Administrator","AJ","Customers & billing"]].map(x=>`<article class="customer-card"><header><div class="avatar">${x[2]}</div><div><h3>${x[0]}</h3><p>${x[1]}</p></div></header><div class="customer-actions"><span class="status paid">Active</span><small>${x[3]}</small></div></article>`).join("")}</div>`}
function settingsView(){return pageHeading("Settings","Configure business branding, documents, reminders and permissions.",button("Save changes","demoAction('Demo settings saved')"))+`<div class="profile-sections"><article class="card"><div class="card-header"><h3>Business profile</h3></div><div class="form-grid"><label>Business name<input value="Island AirCare Ltd."></label><label>Telephone<input value="868-555-0100"></label><label>Email<input value="service@islandaircare.example"></label><label>Currency<select><option>TT$ — Trinidad & Tobago Dollar</option></select></label><label class="full">Address<textarea>St. Augustine, Trinidad and Tobago</textarea></label></div></article><article class="card"><div class="card-header"><h3>Reminders & documents</h3></div><div class="list">${["Email service reminders","WhatsApp message preparation","Low-stock alerts","Branded quotation and invoice PDFs","Employee activity log"].map((x,i)=>`<div class="list-row"><div><strong>${x}</strong><small>${i===1?"Manual demo mode":"Enabled"}</small></div><span></span><span class="status ${i===1?"soon":"paid"}">${i===1?"Optional":"On"}</span></div>`).join("")}</div></article></div>`}
const views={dashboard,customers:customersView,jobs:jobsView,schedule:scheduleView,inventory:inventoryView,quotes:quotesView,payments:paymentsView,reports:reportsView,employees:employeesView,settings:settingsView};
const dashboardBase=views.dashboard;
views.dashboard=()=>dashboardBase()
  .replace("Good morning, Daniel",`${greeting()}, Daniel`)
  .replace("Here is what is happening with your business today.",`Here is what is happening with your business today — ${localDate()}.`);
function navigate(view){state.view=view;$("#pageTitle").textContent=view==="quotes"?"Quotes & Invoices":view.charAt(0).toUpperCase()+view.slice(1);$("#viewContainer").innerHTML=views[view]();document.querySelectorAll(".nav-link").forEach(x=>x.classList.toggle("active",x.dataset.view===view));$("#sidebar").classList.remove("open");window.scrollTo(0,0)}
function filterCustomers(v){$("#viewContainer").innerHTML=customersView(v);$("#customerFilter").focus();$("#customerFilter").setSelectionRange(v.length,v.length)}
function openCustomer(id){const c=customers.find(x=>x.id===id);$("#modalBody").innerHTML=`<div class="profile-header"><div class="avatar">${c.initials}</div><div><h2 id="modalTitle">${c.name}</h2><p>${c.phone} • ${c.email}<br>${c.address}</p></div></div><div class="action-row" style="margin-top:1rem">${button("Schedule service","closeModal();openNewJob()")}${button("Create quote","closeModal();openQuote()",true)}${button("Send reminder","demoAction('WhatsApp reminder prepared')",true)}</div><div class="profile-sections"><article class="card"><div class="card-header"><h3>Registered AC units</h3></div><div class="unit"><strong>Split AC • Living Room</strong><br>18,000 BTU • White-Westinghouse<br><small>Serial: WW-18K-20491 • Next service: ${c.next}</small></div><div class="unit"><strong>Window AC • Bedroom</strong><br>12,000 BTU • Midea<br><small>Serial: MD-12K-10982 • Next service: ${c.next}</small></div></article><article class="card"><div class="card-header"><h3>Service timeline</h3></div><div class="timeline"><div class="timeline-item"><strong>General service completed</strong><small>18 Jul 2026 • TT$700 • Ravi Singh</small></div><div class="timeline-item"><strong>Capacitor replaced</strong><small>14 Jan 2026 • TT$1,050 • Leah Joseph</small></div><div class="timeline-item"><strong>Unit installed</strong><small>8 Aug 2025 • TT$5,800</small></div></div></article></div>`;$("#modal").classList.remove("hidden")}
function openNewCustomer(){$("#modalBody").innerHTML=`<h2 id="modalTitle">Add customer</h2><p style="color:#777">Create a new customer record for this demonstration.</p><form class="form-grid" onsubmit="event.preventDefault();closeModal();toast('Customer added to the demo')"><label>Full name<input required placeholder="Customer name"></label><label>Telephone<input required placeholder="868-555-0000"></label><label>Email<input type="email" placeholder="name@example.com"></label><label>Location<input placeholder="Town, Trinidad"></label><label class="full">Notes<textarea placeholder="Customer preferences or directions"></textarea></label><div class="full">${button("Save customer","",false)}</div></form>`;$("#modal").classList.remove("hidden")}
function openNewJob(){$("#modalBody").innerHTML=`<h2 id="modalTitle">Create service job</h2><p style="color:#777">Schedule an AC service and assign a technician.</p><form class="form-grid" onsubmit="event.preventDefault();closeModal();toast('Job scheduled successfully')"><label>Customer<select>${customers.map(c=>`<option>${c.name}</option>`).join("")}</select></label><label>Service type<select><option>General AC service</option><option>Repair</option><option>Installation</option><option>Site inspection</option></select></label><label>Date<input type="date" value="2026-07-29"></label><label>Technician<select><option>Ravi Singh</option><option>Leah Joseph</option></select></label><label class="full">Job notes<textarea placeholder="Reported issue and service instructions"></textarea></label><div class="full">${button("Schedule job","",false)}</div></form>`;$("#modal").classList.remove("hidden")}
function openQuote(ref="New quotation"){$("#modalBody").innerHTML=`<div style="border:1px solid #ddd;padding:1.4rem"><div style="display:flex;justify-content:space-between;border-bottom:2px solid #c79328;padding-bottom:1rem"><div><div class="brand-mark">S</div><strong>SAMBRANO DEMO COMPANY</strong></div><div style="text-align:right"><h2 id="modalTitle" style="margin:0">${ref}</h2><small>28 July 2026</small></div></div><p><strong>Bill to:</strong><br>John Smith<br>St. Augustine, Trinidad</p><table class="data-table" style="min-width:0"><tr><th>Description</th><th>Amount</th></tr><tr><td>General service — Split AC</td><td>TT$700</td></tr><tr><td>Filter replacement</td><td>TT$120</td></tr><tr><td>Materials</td><td>TT$80</td></tr><tr><td><strong>Total</strong></td><td><strong>TT$900</strong></td></tr></table><p style="text-align:center;color:#777;font-size:.7rem;margin-top:2rem">Thank you for your business.<br>Powered by Sambrano Service Administrator</p></div><div class="action-row" style="margin-top:1rem">${button("Export PDF","demoAction('PDF export demonstrated')")}${button("Email customer","demoAction('Email prepared')",true)}</div>`;$("#modal").classList.remove("hidden")}
function openStock(){
  $("#modalBody").innerHTML=`<h2 id="modalTitle">Add stock item</h2><p style="color:#777">Add a temporary inventory record to this demonstration.</p><form class="form-grid" data-demo-form="stock"><label>Item name<input name="item" required maxlength="80" placeholder="Part or material"></label><label>Quantity<input name="quantity" type="number" required min="0" max="999" value="1"></label><label>Cost price (TT$)<input name="cost" type="number" required min="0" step=".01"></label><label>Selling price (TT$)<input name="price" type="number" required min="0" step=".01"></label><div class="full">${button("Add to inventory","",false)}</div></form>`;
  $("#modal").classList.remove("hidden");
  $("#modalBody input").focus();
}
function recordPayment(){
  $("#modalBody").innerHTML=`<h2 id="modalTitle">Record payment</h2><p style="color:#777">Record a temporary payment for this browser session.</p><form class="form-grid" data-demo-form="payment"><label>Customer<select name="customer">${customers.map(c=>`<option>${c.name}</option>`).join("")}</select></label><label>Invoice reference<input name="invoice" required pattern="[A-Za-z0-9-]{3,20}" value="INV-1025"></label><label>Amount (TT$)<input name="amount" type="number" required min="1" step=".01"></label><label>Payment date<input name="date" type="date" required value="${new Date().toISOString().slice(0,10)}"></label><div class="full">${button("Record payment","",false)}</div></form>`;
  $("#modal").classList.remove("hidden");
}
function exportReport(){
  const rows=[["Metric","Value"],["Monthly revenue","TT$48,750"],["Estimated gross profit","TT$21,320"],["Outstanding invoices","TT$12,450"],["Jobs completed","31"],["Repeat customers","68%"],["Inventory value","TT$37,840"]];
  const csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="island-aircare-july-2026-report.csv";link.click();URL.revokeObjectURL(url);
  toast("Report downloaded as CSV");
}
function demoAction(message="This feature is available in the production system"){
  if(message==="Stock item form opened"){openStock();return}
  if(message==="Payment form opened"){recordPayment();return}
  if(message==="Report prepared for export"){exportReport();return}
  toast(message);
}
function closeModal(){
  $("#modal").classList.add("hidden");
  if(state.lastFocus)state.lastFocus.focus();
}
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const u=$("#username").value.trim().toUpperCase(),p=$("#password").value.trim().toUpperCase();if(u==="ADMIN"&&p==="ADMIN"){$("#loginScreen").classList.add("hidden");$("#appShell").classList.remove("hidden");navigate("dashboard")}else{$("#loginError").textContent="Incorrect demo login. Use ADMIN / ADMIN."}});
$("#togglePassword").addEventListener("click",()=>{const p=$("#password");p.type=p.type==="password"?"text":"password";$("#togglePassword").textContent=p.type==="password"?"Show":"Hide"});
$("#mainNav").addEventListener("click",e=>{const b=e.target.closest("[data-view]");if(b)navigate(b.dataset.view)});
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#logoutBtn").addEventListener("click",()=>{$("#appShell").classList.add("hidden");$("#loginScreen").classList.remove("hidden");$("#password").value="ADMIN"});
$("#dismissBanner").addEventListener("click",e=>e.target.parentElement.remove());
$("#closeModal").addEventListener("click",closeModal);
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
$("#globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){navigate("customers");filterCustomers(e.target.value)}});
$("#notificationBtn").addEventListener("click",()=>{
  const pop=$("#topPopover"),opening=pop.classList.contains("hidden");
  pop.innerHTML=`<div class="popover-head"><h3>Notifications</h3><small>3 new</small></div><div class="popover-item"><span>!</span><div><strong>Three stock items need attention</strong><small>Inventory • 12 minutes ago</small></div></div><div class="popover-item"><span>✓</span><div><strong>Payment received from Maria Gomez</strong><small>Payments • 1 hour ago</small></div></div><div class="popover-item"><span>⌁</span><div><strong>Two service reminders are due today</strong><small>Customers • 2 hours ago</small></div></div>`;
  pop.classList.toggle("hidden",!opening);
  $("#notificationBtn").setAttribute("aria-expanded",String(opening));
  $("#profileBtn").setAttribute("aria-expanded","false");
});
$("#profileBtn").addEventListener("click",()=>{
  const pop=$("#topPopover"),opening=pop.classList.contains("hidden")||!pop.classList.contains("profile-open");
  pop.classList.toggle("profile-open",opening);
  pop.innerHTML=`<div class="popover-head"><h3>Daniel Adams</h3><small>Owner</small></div><div class="profile-menu"><button type="button" onclick="navigate('settings');hidePopover()">Business settings</button><button type="button" onclick="toast('Help centre opened in demo mode');hidePopover()">Help & support</button><button type="button" onclick="document.querySelector('#logoutBtn').click();hidePopover()">Sign out</button></div>`;
  pop.classList.toggle("hidden",!opening);
  $("#profileBtn").setAttribute("aria-expanded",String(opening));
  $("#notificationBtn").setAttribute("aria-expanded","false");
});
function hidePopover(){$("#topPopover").classList.add("hidden");$("#topPopover").classList.remove("profile-open");$("#notificationBtn").setAttribute("aria-expanded","false");$("#profileBtn").setAttribute("aria-expanded","false")}
document.addEventListener("click",e=>{
  if(!e.target.closest(".top-actions")&&!e.target.closest("#topPopover"))hidePopover();
  if(e.target.closest("button[onclick*='open'], .customer-card button, .primary-btn, .secondary-btn"))state.lastFocus=e.target.closest("button");
});
document.addEventListener("submit",e=>{
  const form=e.target,data=new FormData(form),kind=form.dataset.demoForm;
  if(kind==="stock"){
    e.preventDefault();
    const quantity=Number(data.get("quantity")),cost=Number(data.get("cost")),price=Number(data.get("price"));
    inventory.unshift([escapeHtml(data.get("item")),String(quantity),"0",money(cost),money(price),quantity<=2?"Low":"Healthy"]);
    closeModal();navigate("inventory");toast("Stock item added to the demo");
  }
  if(kind==="payment"){
    e.preventDefault();
    payments.unshift([`PAY-${1080+payments.length}`,escapeHtml(data.get("customer")),escapeHtml(data.get("invoice")),new Intl.DateTimeFormat("en-TT",{day:"numeric",month:"short",year:"numeric"}).format(new Date(data.get("date")+"T12:00:00")),money(Number(data.get("amount"))),"Paid"]);
    closeModal();navigate("payments");toast("Payment recorded successfully");
  }
  if(form.closest("#modal")&&$("#modalTitle")?.textContent==="Add customer"&&!kind){
    const inputs=form.querySelectorAll("input");
    const name=inputs[0].value.trim(),phone=inputs[1].value.trim(),email=inputs[2].value.trim(),address=inputs[3].value.trim();
    if(name){
      const initials=name.split(/\s+/).slice(0,2).map(part=>part[0]).join("").toUpperCase();
      customers.unshift({id:Math.max(...customers.map(c=>c.id))+1,name:escapeHtml(name),initials,phone:escapeHtml(phone),email:escapeHtml(email),address:escapeHtml(address||"Trinidad and Tobago"),units:0,last:"—",next:"Not scheduled",status:"Active"});
    }
  }
  if(form.closest("#modal")&&$("#modalTitle")?.textContent==="Create service job"&&!kind){
    const fields=form.querySelectorAll("select,input"),customer=fields[0].value,service=fields[1].value,date=fields[2].value,technician=fields[3].value;
    jobs.unshift([`JOB-${1052+jobs.length}`,escapeHtml(customer),`${escapeHtml(service)} • New request`,"Scheduled",`${date||"Date pending"} • ${escapeHtml(technician)}`]);
  }
},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){hidePopover();if(!$("#modal").classList.contains("hidden"))closeModal()}});
