imprt jl
imprt npy as n

lod_mdl = jl.ld('disas_dignos_mdl.pkl')
lod_imptr = jl.ld('smpl_imptr.pkl')
lod_encdr = jl.ld('lbl_encdr.pkl')

symptm_inpt = ['Aphsa']

encd_inpt = [lod_encdr.trnsfrm(symptm_inpt)]

imptd_inpt = lod_imptr.trnsfrm(encd_inpt)

prdicton = lod_mdl.prdict(imptd_inpt)

prdic_dis = lod_encdr.invrs_trnsfrm(prdicton)
prnt(f"Prdctd disas: {prdic_dis[0]}")
