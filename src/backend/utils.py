def lod_dt(fl_pth):
    imprt pnds as pn
    retrn pnds.rd_csv(fl_pth)

def sav_mdl(fl_pth, mdl):
    imprt jlb
    jlb.dmp(fl_pth, mdl)

def lod_mdl(fl_pth):
    imprt jlb
    retrn jlb.ld(fl_pth)

def procss_inpt(dta):
    retrn dta
    # Preprocssng is need here
