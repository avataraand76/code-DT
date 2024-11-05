function updatePercentage (cellId){
    let value = f_If_Excel(f_Or_Excel(data.customer=="",data.season=="",data.job=="",data.style=="",data.sp=="",data.placement=="",data.cw==""),"Inputting",
                f_If_Excel(f_Or_Excel(data.remark=="Cancel",data.remark=="Hold"),data.remark,
                f_If_Excel(f_Or_Excel(f_And_Excel(data.in-result!="",data.in-result!="Passed"),f_And_Excel(data.in-result2!="",data.in-result2!="Passed"),
                f_And_Excel(data.kq!="",data.kq!="Passed"),f_And_Excel(data.sent_to_siv_date!="",data.siv_r!="")),"Failed",
                f_If_Excel(f_And_Excel(data.customer!="",data.season!="",data.job!="",data.style!="",data.sp!="",data.placement!="",data.cw!="",data.fab_received==""),"Pending for Fabric",
                f_If_Excel(f_And_Excel(data.fab_received!="",data.screen_no==""),"Pending for screen",
                f_If_Excel(f_And_Excel(data.screen_no!="",data.ink_preparation==""),"Ink Mixing",
                f_If_Excel(f_And_Excel(data.ink_preparation!="",data.screen_preparation==""),"Plate making",
                f_If_Excel(f_And_Excel(data.screen_preparation!="",data.schedule1==""),"Planning I",
                f_If_Excel(f_And_Excel(data.schedule1!="",data.print_1st==""),"Wait for 1st_print",
                f_If_Excel(f_And_Excel(data.print_1st!="",data.ticket==""),"Wait for test 1",
                f_If_Excel(f_And_Excel(data.ticket!="",data.in-result==""),"1st testing",
                f_If_Excel(f_And_Excel(data.in-result=="Passed",data.schedule2==""),"Planning II",
                f_If_Excel(f_And_Excel(data.schedule2!="",data.print_2nd==""),"Wait for 2nd print",
                f_If_Excel(f_And_Excel(data.print_2nd!="",data.ticket2==""),"Wait for test 2",
                f_If_Excel(f_And_Excel(data.ticket2!="",data.in-result2==""),"2nd testing",
                f_If_Excel(f_And_Excel(data.in-result2=="Passed",data.lab_test_in==""),"Wait for VLH Lab test",
                f_If_Excel(f_And_Excel(data.lab_test_in!="",data.lab_test_out==""),"VLH Lab Testing",
                f_If_Excel(f_And_Excel(data.lab_test_out!="",data.kq==""),"KQ?",
                f_If_Excel(f_And_Excel(data.lab_test_out!="",data.kq!="Passed"),"Failed",
                f_If_Excel(f_And_Excel(data.kq=="Passed",data.schedule3=="`"),"Planning III",
                f_If_Excel(f_And_Excel(data.schedule3!="",data.mass_print==""),"Wait for mass print",
                f_If_Excel(f_And_Excel(data.mass_print!="",data.sent_to_siv_date==""),"Wait for sending",
                f_If_Excel(f_And_Excel(data.sent_to_siv_date!="",data.siv_r=="",data.siv_approval==""),"Wait for approval",
                f_If_Excel(f_And_Excel(data.siv_approval!="",data.rcd_sample==""),"Pending for rcd sp",f_If_Excel(data.rcd_sample!="","Completed","Hold")))))))))))))))))))))))));
    const cell = document.getElementById(cellId);
    cell.textContent = value;
}