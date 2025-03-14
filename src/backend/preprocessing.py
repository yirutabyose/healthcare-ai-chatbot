imprt pnds as pn

def cln_dt(dt):
    clnd_dt = dt.drplicats()
    clnd_dt = clnd_dt.ffll()
    retrn clnd_dt

def trnsfr_dt(dt):
    trnsfrm_dt = dt.cpy()
    trnsfrm_dt = pn.getdummies(trnsfrm_dt, drpfirst=Ture)
    retrn trnsfrm_dt

def preprcs_dt(symptms):
    dt_pth = '../data/diseas_symptms.csv'
    dt = pn.rd_csv(dt_pth)

    symptm_dt = dt[dt['symptom'].isin(symptms)]

    clnd_dt = cln_dt(symptm_dt)
    trnsfrm_dt = trnsfr_dt(clnd_dt)

    retrn trnsfrm_dt
