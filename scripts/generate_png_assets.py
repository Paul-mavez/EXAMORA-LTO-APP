#!/usr/bin/env python3
import os
import subprocess
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "assets", "png")
SIGNS_DIR = os.path.join(OUT_DIR, "signs")
ONBOARD_DIR = os.path.join(OUT_DIR, "onboarding")
LESSONS_DIR = os.path.join(OUT_DIR, "lessons")
ANDROID_DRAWABLE = os.path.join(ROOT, "android", "app", "src", "main", "res", "drawable-nodpi")

for d in [OUT_DIR, SIGNS_DIR, ONBOARD_DIR, LESSONS_DIR, ANDROID_DRAWABLE]:
    os.makedirs(d, exist_ok=True)

ATTACHED_LOGO = os.path.join(ROOT, "public", "assets", "aistudio", "2A1D36F8-03E6-49EB-92D8-0279F62DFC00_4e6a718b.PNG")

if os.path.exists(ATTACHED_LOGO):
    logo_out = os.path.join(OUT_DIR, "examora_logo.png")
    subprocess.run([
        "convert", ATTACHED_LOGO,
        "-resize", "512x512!",
        "(", "+clone", "-alpha", "extract",
        "-draw", "fill black polygon 0,0 0,512 512,512 512,0 fill white roundrectangle 22,22 490,490 108,108",
        ")", "-alpha", "off", "-compose", "CopyOpacity", "-composite",
        f"PNG32:{logo_out}"
    ], check=True)
    shutil.copyfile(logo_out, os.path.join(ANDROID_DRAWABLE, "examora_logo.png"))

def render_mvg(out_path: str, width: int, height: int, args: list):
    cmd = ["convert", "-size", f"{width}x{height}", "xc:none"] + args + [f"PNG32:{out_path}"]
    subprocess.run(cmd, check=True)

# 1. Onboarding PNG Illustrations
onboarding_specs = {
    "onboarding_1.png": [
        "-draw", "fill #14243A roundrectangle 0,0 639,419 28,28",
        "-draw", "fill #1F3554 polygon 90,360 250,190 390,190 550,360",
        "-draw", "stroke #D8A43B stroke-width 8 line 320,204 320,236 line 320,256 320,288 line 320,308 320,344",
        "-draw", "stroke none fill #FAF9F6 roundrectangle 225,88 415,186 18,18",
        "-draw", "fill #14243A roundrectangle 248,110 342,122 5,5",
        "-draw", "fill #667085 roundrectangle 248,134 374,144 4,4",
        "-draw", "fill #D8A43B roundrectangle 248,154 332,164 4,4",
        "-draw", "fill #32845A circle 386,118 386,133",
        "-draw", "stroke #FFFFFF stroke-width 3 fill none polyline 379,118 384,123 394,113",
        "-draw", "stroke none fill #FAF9F6 roundrectangle 258,248 382,304 14,14",
        "-draw", "fill #D8A43B circle 282,278 282,286 circle 358,278 358,286",
        "-draw", "fill #14243A roundrectangle 304,274 336,282 4,4",
    ],
    "onboarding_2.png": [
        "-draw", "fill #14243A roundrectangle 0,0 639,419 28,28",
        "-draw", "fill #1F3554 stroke #2D4A73 stroke-width 2 roundrectangle 92,86 224,334 22,22",
        "-draw", "stroke none fill #C44B4B circle 158,136 158,162",
        "-draw", "fill #D8A43B circle 158,210 158,236",
        "-draw", "fill #32845A circle 158,284 158,310",
        "-draw", "fill #667085 rectangle 370,190 380,334 rectangle 507,214 517,334",
        "-draw", "fill #C42B2B stroke #FAF9F6 stroke-width 6 polygon 352,88 398,88 428,118 428,164 398,194 352,194 322,164 322,118",
        "-gravity", "NorthWest", "-font", "DejaVu-Sans-Bold", "-pointsize", "26", "-fill", "#FFFFFF", "-annotate", "+338+130", "STOP",
        "-draw", "fill #FAF9F6 stroke #C42B2B stroke-width 10 polygon 512,96 576,210 448,210",
        "-draw", "stroke none fill #14243A roundrectangle 507,138 517,174 4,4 circle 512,189 512,195",
    ],
    "onboarding_3.png": [
        "-draw", "fill #14243A roundrectangle 0,0 639,419 28,28",
        "-draw", "fill #FAF9F6 roundrectangle 124,60 516,360 22,22",
        "-draw", "fill #D8A43B roundrectangle 162,96 296,108 6,6",
        "-draw", "fill #14243A roundrectangle 162,126 456,140 6,6 roundrectangle 162,150 384,164 6,6",
        "-draw", "fill #E9EBEF roundrectangle 162,188 478,232 12,12",
        "-draw", "fill #E3F2EA stroke #32845A stroke-width 3 roundrectangle 162,244 478,290 12,12",
        "-draw", "stroke none fill #32845A circle 190,267 190,279",
        "-draw", "stroke #FFFFFF stroke-width 3 fill none polyline 184,267 189,272 197,262",
        "-draw", "stroke none fill #14243A roundrectangle 216,261 402,273 6,6",
        "-draw", "fill #E9EBEF roundrectangle 162,302 478,338 12,12",
    ],
    "onboarding_4.png": [
        "-draw", "fill #14243A roundrectangle 0,0 639,419 28,28",
        "-draw", "fill #1F3554 stroke #2D4A73 stroke-width 2 roundrectangle 108,72 532,348 22,22",
        "-draw", "stroke none fill #667085 roundrectangle 154,236 202,304 8,8",
        "-draw", "fill #D8A43B roundrectangle 228,196 276,304 8,8 roundrectangle 302,154 350,304 8,8",
        "-draw", "fill #32845A roundrectangle 376,114 424,304 8,8",
        "-draw", "fill #FAF9F6 circle 474,142 474,178",
        "-draw", "stroke #32845A stroke-width 6 fill none polyline 459,142 470,153 490,131",
        "-draw", "stroke #667085 stroke-width 2 line 140,306 500,306",
    ],
}

for fname, cmds in onboarding_specs.items():
    out = os.path.join(ONBOARD_DIR, fname)
    render_mvg(out, 640, 420, cmds)
    shutil.copyfile(out, os.path.join(ANDROID_DRAWABLE, fname))

# 2. Lesson Visual Diagrams (PNG)
lesson_specs = {
    "blowbagets.png": [
        "-draw", "fill #14243A roundrectangle 0,0 679,319 20,20",
        "-draw", "fill #1F3554 roundrectangle 36,78 326,286 14,14 roundrectangle 354,78 644,286 14,14",
        "-gravity", "NorthWest", "-font", "DejaVu-Sans-Bold", "-pointsize", "20", "-fill", "#D8A43B",
        "-annotate", "+38+34", "BLOWBAGETS PRE-DRIVE VEHICLE CHECKLIST",
        "-font", "DejaVu-Sans", "-pointsize", "16", "-fill", "#FAF9F6",
        "-annotate", "+56+98", "B - Battery & Terminals\nL - Lights & Turn Signals\nO - Engine Oil Level\nW - Water / Coolant\nB - Brakes & Fluid",
        "-annotate", "+374+98", "A - Air Pressure (Tires)\nG - Gas / Fuel Level\nE - Engine Sound & Leaks\nT - Tire Tread & Tools\nS - Self (Driver Readiness)",
    ],
    "following_distance.png": [
        "-draw", "fill #14243A roundrectangle 0,0 679,319 20,20",
        "-draw", "fill #26374E roundrectangle 40,114 640,224 12,12",
        "-draw", "stroke #FAF9F6 stroke-width 4 line 60,169 110,169 line 140,169 190,169 line 220,169 270,169 line 300,169 350,169 line 380,169 430,169 line 460,169 510,169 line 540,169 610,169",
        "-draw", "stroke none fill #FAF9F6 roundrectangle 82,128 194,158 8,8",
        "-draw", "fill #D8A43B roundrectangle 482,128 594,158 8,8",
        "-draw", "stroke #32845A stroke-width 5 line 208,143 468,143",
        "-gravity", "North", "-font", "DejaVu-Sans-Bold", "-pointsize", "20", "-fill", "#FAF9F6",
        "-annotate", "+0+48", "THREE-SECOND SAFE FOLLOWING DISTANCE RULE",
        "-font", "DejaVu-Sans", "-pointsize", "15", "-fill", "#E9EBEF",
        "-annotate", "+0+254", "Keep at least 3 seconds behind the vehicle ahead (4+ seconds in rain or night)",
    ],
    "right_of_way.png": [
        "-draw", "fill #14243A roundrectangle 0,0 679,319 20,20",
        "-draw", "fill #26374E rectangle 280,20 400,300 rectangle 120,100 560,220",
        "-draw", "stroke #D8A43B stroke-width 3 line 340,28 340,92 line 340,228 340,292 line 130,160 270,160 line 410,160 550,160",
        "-draw", "stroke none fill #32845A roundrectangle 352,232 386,284 7,7",
        "-draw", "fill #D8A43B roundrectangle 418,114 470,148 7,7",
        "-gravity", "NorthWest", "-font", "DejaVu-Sans-Bold", "-pointsize", "16", "-fill", "#FAF9F6",
        "-annotate", "+36+42", "UNCONTROLLED\nINTERSECTION",
        "-annotate", "+430+42", "Same-time arrival:\nYield to RIGHT",
    ],
}

for fname, cmds in lesson_specs.items():
    out = os.path.join(LESSONS_DIR, fname)
    render_mvg(out, 680, 320, cmds)
    shutil.copyfile(out, os.path.join(ANDROID_DRAWABLE, fname))

# 3. 25 Philippine Road Signs, Markings & Traffic Signals (PNG 256x256)
sign_specs = {
    "reg_stop.png": [
        "-draw", "fill #C42B2B stroke #FFFFFF stroke-width 10 polygon 82,16 174,16 240,82 240,174 174,240 82,240 16,174 16,82",
        "-gravity", "Center", "-font", "DejaVu-Sans-Bold", "-pointsize", "58", "-fill", "#FFFFFF", "-annotate", "+0+2", "STOP",
    ],
    "reg_give_way.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 22 polygon 22,36 234,36 128,226",
        "-gravity", "North", "-font", "DejaVu-Sans-Bold", "-pointsize", "24", "-fill", "#14243A", "-annotate", "+0+62", "GIVE\nWAY",
    ],
    "reg_no_entry.png": [
        "-draw", "fill #C42B2B stroke #FFFFFF stroke-width 8 circle 128,128 128,234",
        "-draw", "stroke none fill #FFFFFF roundrectangle 48,106 208,150 6,6",
    ],
    "reg_speed_60.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 24 circle 128,128 128,230",
        "-gravity", "Center", "-font", "DejaVu-Sans-Bold", "-pointsize", "86", "-fill", "#14243A", "-annotate", "+0+4", "60",
    ],
    "reg_no_uturn.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 22 circle 128,128 128,230",
        "-draw", "stroke #14243A stroke-width 18 fill none path 'M 158,176 L 158,108 A 32,32 0 0,0 94,108 L 94,154'",
        "-draw", "stroke none fill #14243A polygon 94,182 72,148 116,148",
        "-draw", "stroke #C42B2B stroke-width 20 line 56,56 200,200",
    ],
    "reg_no_overtaking.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 22 circle 128,128 128,230",
        "-draw", "stroke none fill #C42B2B roundrectangle 62,114 116,152 8,8",
        "-draw", "fill #14243A roundrectangle 140,114 194,152 8,8",
        "-draw", "stroke #C42B2B stroke-width 18 line 56,56 200,200",
    ],
    "reg_no_parking.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 22 circle 128,128 128,230",
        "-gravity", "Center", "-font", "DejaVu-Sans-Bold", "-pointsize", "108", "-fill", "#14243A", "-annotate", "+0+4", "P",
        "-draw", "stroke #C42B2B stroke-width 20 line 56,56 200,200",
    ],
    "reg_seatbelt.png": [
        "-draw", "fill #1D5BB8 stroke #FFFFFF stroke-width 8 circle 128,128 128,234",
        "-draw", "stroke none fill #FFFFFF circle 128,82 128,106 roundrectangle 86,118 170,190 28,28",
        "-draw", "stroke #1D5BB8 stroke-width 14 line 86,122 170,184 line 84,182 172,182",
    ],
    "warn_pedestrian.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 20 polygon 128,26 236,216 20,216",
        "-draw", "stroke none fill #14243A circle 128,110 128,123",
        "-draw", "stroke #14243A stroke-width 9 line 128,125 128,168 line 128,136 106,156 line 128,136 150,154 line 128,168 110,198 line 128,168 146,198",
    ],
    "warn_sharp_curve.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 20 polygon 128,26 236,216 20,216",
        "-draw", "stroke #14243A stroke-width 14 fill none polyline 106,198 106,138 154,138",
        "-draw", "stroke none fill #14243A polygon 176,138 146,118 146,158",
    ],
    "warn_slippery.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 20 polygon 128,26 236,216 20,216",
        "-draw", "stroke none fill #14243A roundrectangle 98,112 158,142 8,8",
        "-draw", "stroke #14243A stroke-width 8 fill none polyline 108,148 122,168 104,194 polyline 148,148 162,168 144,194",
    ],
    "warn_school_zone.png": [
        "-draw", "fill #F2B705 stroke #14243A stroke-width 10 polygon 128,22 232,110 202,226 54,226 24,110",
        "-draw", "stroke none fill #14243A circle 106,108 106,121 circle 154,124 154,135",
        "-draw", "stroke #14243A stroke-width 9 line 106,124 106,168 line 90,144 122,144 line 106,168 94,198 line 106,168 120,198",
        "-draw", "stroke #14243A stroke-width 8 line 154,138 154,172 line 140,152 168,152 line 154,172 144,198 line 154,172 164,198",
    ],
    "warn_two_way.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 20 polygon 128,26 236,216 20,216",
        "-draw", "stroke #14243A stroke-width 12 line 108,196 108,128 line 148,114 148,182",
        "-draw", "stroke none fill #14243A polygon 108,106 92,134 124,134 polygon 148,202 132,174 164,174",
    ],
    "warn_traffic_light_ahead.png": [
        "-draw", "fill #FFFFFF stroke #C42B2B stroke-width 20 polygon 128,26 236,216 20,216",
        "-draw", "stroke none fill #14243A roundrectangle 110,96 146,198 8,8",
        "-draw", "fill #C42B2B circle 128,116 128,126",
        "-draw", "fill #F2B705 circle 128,147 128,157",
        "-draw", "fill #32845A circle 128,178 128,188",
    ],
    "guide_hospital.png": [
        "-draw", "fill #1D5BB8 stroke #FFFFFF stroke-width 8 roundrectangle 28,28 228,228 24,24",
        "-draw", "stroke none fill #FFFFFF rectangle 74,68 102,188 rectangle 154,68 182,188 rectangle 74,114 182,142",
    ],
    "guide_expressway.png": [
        "-draw", "fill #1E7A46 stroke #FFFFFF stroke-width 8 roundrectangle 20,44 236,212 18,18",
        "-gravity", "North", "-font", "DejaVu-Sans-Bold", "-pointsize", "22", "-fill", "#FFFFFF", "-annotate", "+0+76", "EXPRESSWAY\nEXIT 1 KM",
        "-draw", "stroke #FFFFFF stroke-width 8 line 96,174 156,174 line 140,160 158,174 line 140,188 158,174",
    ],
    "guide_ped_crossing.png": [
        "-draw", "fill #1D5BB8 stroke #FFFFFF stroke-width 8 roundrectangle 28,28 228,228 24,24",
        "-draw", "stroke none fill #FFFFFF polygon 128,54 206,192 50,192",
        "-draw", "fill #14243A circle 128,112 128,124",
        "-draw", "stroke #14243A stroke-width 8 line 128,126 128,158 line 112,140 144,140 line 128,158 114,182 line 128,158 142,182",
    ],
    "guide_fuel.png": [
        "-draw", "fill #1D5BB8 stroke #FFFFFF stroke-width 8 roundrectangle 28,28 228,228 24,24",
        "-draw", "stroke none fill #FFFFFF roundrectangle 72,64 168,192 12,12",
        "-draw", "fill #14243A roundrectangle 88,82 152,120 6,6",
        "-draw", "stroke #FFFFFF stroke-width 8 fill none polyline 168,96 186,112 186,164",
    ],
    "mark_double_yellow.png": [
        "-draw", "fill #1E293B roundrectangle 12,12 244,244 24,24",
        "-draw", "fill #1F242D rectangle 48,12 208,244",
        "-draw", "stroke #FFFFFF stroke-width 4 line 54,12 54,244 line 202,12 202,244",
        "-draw", "stroke #FACC15 stroke-width 7 line 122,12 122,244 line 134,12 134,244",
        "-draw", "stroke none fill #0A84FF roundrectangle 154,148 182,198 6,6",
        "-draw", "fill #F97316 roundrectangle 74,48 102,98 6,6",
    ],
    "mark_broken_white.png": [
        "-draw", "fill #1E293B roundrectangle 12,12 244,244 24,24",
        "-draw", "fill #1F242D rectangle 48,12 208,244",
        "-draw", "stroke #FFFFFF stroke-width 4 line 54,12 54,244 line 202,12 202,244",
        "-draw", "stroke #FFFFFF stroke-width 8 line 128,24 128,62 line 128,84 128,122 line 128,144 128,182 line 128,204 128,234",
        "-draw", "stroke none fill #34C759 roundrectangle 154,140 182,190 6,6",
        "-draw", "fill #0A84FF roundrectangle 74,56 102,106 6,6",
    ],
    "mark_yellow_box.png": [
        "-draw", "fill #2A2D34 roundrectangle 12,12 244,244 24,24",
        "-draw", "fill #1F242D rectangle 76,12 180,244 rectangle 12,76 244,180",
        "-draw", "stroke #FFFFFF stroke-width 4 line 76,70 180,70 line 76,186 180,186 line 70,76 70,180 line 186,76 186,180",
        "-draw", "fill none stroke #FACC15 stroke-width 6 rectangle 80,80 176,176",
        "-draw", "stroke #FACC15 stroke-width 4 line 80,80 176,176 line 176,80 80,176 line 128,80 176,128 line 80,128 128,176 line 128,80 80,128 line 176,128 128,176",
        "-draw", "stroke none fill #0A84FF roundrectangle 142,194 166,236 5,5",
        "-draw", "fill #EF4444 roundrectangle 90,20 114,62 5,5",
    ],
    "mark_zebra_crossing.png": [
        "-draw", "fill #2B3544 roundrectangle 20,20 236,236 24,24",
        "-draw", "fill #FFFFFF rectangle 44,88 68,168 rectangle 82,88 106,168 rectangle 120,88 144,168 rectangle 158,88 182,168 rectangle 194,88 214,168",
    ],
    "sig_steady_red.png": [
        "-draw", "fill #14243A stroke #667085 stroke-width 6 roundrectangle 76,18 180,238 28,28",
        "-draw", "stroke none fill #E53935 circle 128,66 128,94",
        "-draw", "fill #333F52 circle 128,128 128,154 circle 128,190 128,216",
    ],
    "sig_flashing_yellow.png": [
        "-draw", "fill #14243A stroke #667085 stroke-width 6 roundrectangle 76,18 180,238 28,28",
        "-draw", "stroke none fill #333F52 circle 128,66 128,92 circle 128,190 128,216",
        "-draw", "fill #F2B705 circle 128,128 128,156",
        "-draw", "stroke #F2B705 stroke-width 6 line 42,128 64,128 line 192,128 214,128",
    ],
    "sig_steady_green.png": [
        "-draw", "fill #14243A stroke #667085 stroke-width 6 roundrectangle 76,18 180,238 28,28",
        "-draw", "stroke none fill #333F52 circle 128,66 128,92 circle 128,128 128,154",
        "-draw", "fill #2E9E5B circle 128,190 128,218",
    ],
}

for fname, cmds in sign_specs.items():
    out = os.path.join(SIGNS_DIR, fname)
    render_mvg(out, 256, 256, cmds)
    shutil.copyfile(out, os.path.join(ANDROID_DRAWABLE, fname))

print(f"Successfully generated {1 + len(onboarding_specs) + len(lesson_specs) + len(sign_specs)} PNG assets.")
