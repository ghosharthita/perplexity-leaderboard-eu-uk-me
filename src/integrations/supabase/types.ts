export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leaderboard_data_1738627088110: {
        Row: {
          "Activations (BTS 2025 Spring)": string | null
          Country: string | null
          created_at: string | null
          "Email Domain": string | null
          id: number
          Queries: string | null
          "Queries (from BTS 2025 Spring Registrations)": string | null
          "School Name": string | null
          "Strategist Region": string | null
          "US State": string | null
        }
        Insert: {
          "Activations (BTS 2025 Spring)"?: string | null
          Country?: string | null
          created_at?: string | null
          "Email Domain"?: string | null
          id?: number
          Queries?: string | null
          "Queries (from BTS 2025 Spring Registrations)"?: string | null
          "School Name"?: string | null
          "Strategist Region"?: string | null
          "US State"?: string | null
        }
        Update: {
          "Activations (BTS 2025 Spring)"?: string | null
          Country?: string | null
          created_at?: string | null
          "Email Domain"?: string | null
          id?: number
          Queries?: string | null
          "Queries (from BTS 2025 Spring Registrations)"?: string | null
          "School Name"?: string | null
          "Strategist Region"?: string | null
          "US State"?: string | null
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          created_at: string
          headers: string[]
          id: number
          rows: Json
        }
        Insert: {
          created_at?: string
          headers: string[]
          id?: number
          rows: Json
        }
        Update: {
          created_at?: string
          headers?: string[]
          id?: number
          rows?: Json
        }
        Relationships: []
      }
      perplexity_leaderboard_1738713059170: {
        Row: {
          "0": string | null
          "1": string | null
          "10": string | null
          "100": string | null
          "101": string | null
          "102": string | null
          "103": string | null
          "104": string | null
          "105": string | null
          "106": string | null
          "107": string | null
          "108": string | null
          "109": string | null
          "11": string | null
          "110": string | null
          "111": string | null
          "112": string | null
          "113": string | null
          "114": string | null
          "115": string | null
          "116": string | null
          "117": string | null
          "118": string | null
          "119": string | null
          "12": string | null
          "120": string | null
          "121": string | null
          "122": string | null
          "123": string | null
          "124": string | null
          "125": string | null
          "126": string | null
          "127": string | null
          "128": string | null
          "129": string | null
          "13": string | null
          "130": string | null
          "131": string | null
          "132": string | null
          "133": string | null
          "134": string | null
          "135": string | null
          "136": string | null
          "137": string | null
          "138": string | null
          "139": string | null
          "14": string | null
          "140": string | null
          "141": string | null
          "142": string | null
          "143": string | null
          "144": string | null
          "145": string | null
          "146": string | null
          "147": string | null
          "148": string | null
          "149": string | null
          "15": string | null
          "150": string | null
          "151": string | null
          "152": string | null
          "153": string | null
          "154": string | null
          "155": string | null
          "156": string | null
          "157": string | null
          "158": string | null
          "159": string | null
          "16": string | null
          "160": string | null
          "161": string | null
          "162": string | null
          "163": string | null
          "164": string | null
          "165": string | null
          "166": string | null
          "167": string | null
          "168": string | null
          "169": string | null
          "17": string | null
          "170": string | null
          "171": string | null
          "172": string | null
          "173": string | null
          "174": string | null
          "175": string | null
          "176": string | null
          "177": string | null
          "178": string | null
          "179": string | null
          "18": string | null
          "180": string | null
          "181": string | null
          "182": string | null
          "183": string | null
          "184": string | null
          "185": string | null
          "186": string | null
          "187": string | null
          "188": string | null
          "189": string | null
          "19": string | null
          "190": string | null
          "2": string | null
          "20": string | null
          "21": string | null
          "22": string | null
          "23": string | null
          "24": string | null
          "25": string | null
          "26": string | null
          "27": string | null
          "28": string | null
          "29": string | null
          "3": string | null
          "30": string | null
          "31": string | null
          "32": string | null
          "33": string | null
          "34": string | null
          "35": string | null
          "36": string | null
          "37": string | null
          "38": string | null
          "39": string | null
          "4": string | null
          "40": string | null
          "41": string | null
          "42": string | null
          "43": string | null
          "44": string | null
          "45": string | null
          "46": string | null
          "47": string | null
          "48": string | null
          "49": string | null
          "5": string | null
          "50": string | null
          "51": string | null
          "52": string | null
          "53": string | null
          "54": string | null
          "55": string | null
          "56": string | null
          "57": string | null
          "58": string | null
          "59": string | null
          "6": string | null
          "60": string | null
          "61": string | null
          "62": string | null
          "63": string | null
          "64": string | null
          "65": string | null
          "66": string | null
          "67": string | null
          "68": string | null
          "69": string | null
          "7": string | null
          "70": string | null
          "71": string | null
          "72": string | null
          "73": string | null
          "74": string | null
          "75": string | null
          "76": string | null
          "77": string | null
          "78": string | null
          "79": string | null
          "8": string | null
          "80": string | null
          "81": string | null
          "82": string | null
          "83": string | null
          "84": string | null
          "85": string | null
          "86": string | null
          "87": string | null
          "88": string | null
          "89": string | null
          "9": string | null
          "90": string | null
          "91": string | null
          "92": string | null
          "93": string | null
          "94": string | null
          "95": string | null
          "96": string | null
          "97": string | null
          "98": string | null
          "99": string | null
          created_at: string | null
          id: number
        }
        Insert: {
          "0"?: string | null
          "1"?: string | null
          "10"?: string | null
          "100"?: string | null
          "101"?: string | null
          "102"?: string | null
          "103"?: string | null
          "104"?: string | null
          "105"?: string | null
          "106"?: string | null
          "107"?: string | null
          "108"?: string | null
          "109"?: string | null
          "11"?: string | null
          "110"?: string | null
          "111"?: string | null
          "112"?: string | null
          "113"?: string | null
          "114"?: string | null
          "115"?: string | null
          "116"?: string | null
          "117"?: string | null
          "118"?: string | null
          "119"?: string | null
          "12"?: string | null
          "120"?: string | null
          "121"?: string | null
          "122"?: string | null
          "123"?: string | null
          "124"?: string | null
          "125"?: string | null
          "126"?: string | null
          "127"?: string | null
          "128"?: string | null
          "129"?: string | null
          "13"?: string | null
          "130"?: string | null
          "131"?: string | null
          "132"?: string | null
          "133"?: string | null
          "134"?: string | null
          "135"?: string | null
          "136"?: string | null
          "137"?: string | null
          "138"?: string | null
          "139"?: string | null
          "14"?: string | null
          "140"?: string | null
          "141"?: string | null
          "142"?: string | null
          "143"?: string | null
          "144"?: string | null
          "145"?: string | null
          "146"?: string | null
          "147"?: string | null
          "148"?: string | null
          "149"?: string | null
          "15"?: string | null
          "150"?: string | null
          "151"?: string | null
          "152"?: string | null
          "153"?: string | null
          "154"?: string | null
          "155"?: string | null
          "156"?: string | null
          "157"?: string | null
          "158"?: string | null
          "159"?: string | null
          "16"?: string | null
          "160"?: string | null
          "161"?: string | null
          "162"?: string | null
          "163"?: string | null
          "164"?: string | null
          "165"?: string | null
          "166"?: string | null
          "167"?: string | null
          "168"?: string | null
          "169"?: string | null
          "17"?: string | null
          "170"?: string | null
          "171"?: string | null
          "172"?: string | null
          "173"?: string | null
          "174"?: string | null
          "175"?: string | null
          "176"?: string | null
          "177"?: string | null
          "178"?: string | null
          "179"?: string | null
          "18"?: string | null
          "180"?: string | null
          "181"?: string | null
          "182"?: string | null
          "183"?: string | null
          "184"?: string | null
          "185"?: string | null
          "186"?: string | null
          "187"?: string | null
          "188"?: string | null
          "189"?: string | null
          "19"?: string | null
          "190"?: string | null
          "2"?: string | null
          "20"?: string | null
          "21"?: string | null
          "22"?: string | null
          "23"?: string | null
          "24"?: string | null
          "25"?: string | null
          "26"?: string | null
          "27"?: string | null
          "28"?: string | null
          "29"?: string | null
          "3"?: string | null
          "30"?: string | null
          "31"?: string | null
          "32"?: string | null
          "33"?: string | null
          "34"?: string | null
          "35"?: string | null
          "36"?: string | null
          "37"?: string | null
          "38"?: string | null
          "39"?: string | null
          "4"?: string | null
          "40"?: string | null
          "41"?: string | null
          "42"?: string | null
          "43"?: string | null
          "44"?: string | null
          "45"?: string | null
          "46"?: string | null
          "47"?: string | null
          "48"?: string | null
          "49"?: string | null
          "5"?: string | null
          "50"?: string | null
          "51"?: string | null
          "52"?: string | null
          "53"?: string | null
          "54"?: string | null
          "55"?: string | null
          "56"?: string | null
          "57"?: string | null
          "58"?: string | null
          "59"?: string | null
          "6"?: string | null
          "60"?: string | null
          "61"?: string | null
          "62"?: string | null
          "63"?: string | null
          "64"?: string | null
          "65"?: string | null
          "66"?: string | null
          "67"?: string | null
          "68"?: string | null
          "69"?: string | null
          "7"?: string | null
          "70"?: string | null
          "71"?: string | null
          "72"?: string | null
          "73"?: string | null
          "74"?: string | null
          "75"?: string | null
          "76"?: string | null
          "77"?: string | null
          "78"?: string | null
          "79"?: string | null
          "8"?: string | null
          "80"?: string | null
          "81"?: string | null
          "82"?: string | null
          "83"?: string | null
          "84"?: string | null
          "85"?: string | null
          "86"?: string | null
          "87"?: string | null
          "88"?: string | null
          "89"?: string | null
          "9"?: string | null
          "90"?: string | null
          "91"?: string | null
          "92"?: string | null
          "93"?: string | null
          "94"?: string | null
          "95"?: string | null
          "96"?: string | null
          "97"?: string | null
          "98"?: string | null
          "99"?: string | null
          created_at?: string | null
          id?: never
        }
        Update: {
          "0"?: string | null
          "1"?: string | null
          "10"?: string | null
          "100"?: string | null
          "101"?: string | null
          "102"?: string | null
          "103"?: string | null
          "104"?: string | null
          "105"?: string | null
          "106"?: string | null
          "107"?: string | null
          "108"?: string | null
          "109"?: string | null
          "11"?: string | null
          "110"?: string | null
          "111"?: string | null
          "112"?: string | null
          "113"?: string | null
          "114"?: string | null
          "115"?: string | null
          "116"?: string | null
          "117"?: string | null
          "118"?: string | null
          "119"?: string | null
          "12"?: string | null
          "120"?: string | null
          "121"?: string | null
          "122"?: string | null
          "123"?: string | null
          "124"?: string | null
          "125"?: string | null
          "126"?: string | null
          "127"?: string | null
          "128"?: string | null
          "129"?: string | null
          "13"?: string | null
          "130"?: string | null
          "131"?: string | null
          "132"?: string | null
          "133"?: string | null
          "134"?: string | null
          "135"?: string | null
          "136"?: string | null
          "137"?: string | null
          "138"?: string | null
          "139"?: string | null
          "14"?: string | null
          "140"?: string | null
          "141"?: string | null
          "142"?: string | null
          "143"?: string | null
          "144"?: string | null
          "145"?: string | null
          "146"?: string | null
          "147"?: string | null
          "148"?: string | null
          "149"?: string | null
          "15"?: string | null
          "150"?: string | null
          "151"?: string | null
          "152"?: string | null
          "153"?: string | null
          "154"?: string | null
          "155"?: string | null
          "156"?: string | null
          "157"?: string | null
          "158"?: string | null
          "159"?: string | null
          "16"?: string | null
          "160"?: string | null
          "161"?: string | null
          "162"?: string | null
          "163"?: string | null
          "164"?: string | null
          "165"?: string | null
          "166"?: string | null
          "167"?: string | null
          "168"?: string | null
          "169"?: string | null
          "17"?: string | null
          "170"?: string | null
          "171"?: string | null
          "172"?: string | null
          "173"?: string | null
          "174"?: string | null
          "175"?: string | null
          "176"?: string | null
          "177"?: string | null
          "178"?: string | null
          "179"?: string | null
          "18"?: string | null
          "180"?: string | null
          "181"?: string | null
          "182"?: string | null
          "183"?: string | null
          "184"?: string | null
          "185"?: string | null
          "186"?: string | null
          "187"?: string | null
          "188"?: string | null
          "189"?: string | null
          "19"?: string | null
          "190"?: string | null
          "2"?: string | null
          "20"?: string | null
          "21"?: string | null
          "22"?: string | null
          "23"?: string | null
          "24"?: string | null
          "25"?: string | null
          "26"?: string | null
          "27"?: string | null
          "28"?: string | null
          "29"?: string | null
          "3"?: string | null
          "30"?: string | null
          "31"?: string | null
          "32"?: string | null
          "33"?: string | null
          "34"?: string | null
          "35"?: string | null
          "36"?: string | null
          "37"?: string | null
          "38"?: string | null
          "39"?: string | null
          "4"?: string | null
          "40"?: string | null
          "41"?: string | null
          "42"?: string | null
          "43"?: string | null
          "44"?: string | null
          "45"?: string | null
          "46"?: string | null
          "47"?: string | null
          "48"?: string | null
          "49"?: string | null
          "5"?: string | null
          "50"?: string | null
          "51"?: string | null
          "52"?: string | null
          "53"?: string | null
          "54"?: string | null
          "55"?: string | null
          "56"?: string | null
          "57"?: string | null
          "58"?: string | null
          "59"?: string | null
          "6"?: string | null
          "60"?: string | null
          "61"?: string | null
          "62"?: string | null
          "63"?: string | null
          "64"?: string | null
          "65"?: string | null
          "66"?: string | null
          "67"?: string | null
          "68"?: string | null
          "69"?: string | null
          "7"?: string | null
          "70"?: string | null
          "71"?: string | null
          "72"?: string | null
          "73"?: string | null
          "74"?: string | null
          "75"?: string | null
          "76"?: string | null
          "77"?: string | null
          "78"?: string | null
          "79"?: string | null
          "8"?: string | null
          "80"?: string | null
          "81"?: string | null
          "82"?: string | null
          "83"?: string | null
          "84"?: string | null
          "85"?: string | null
          "86"?: string | null
          "87"?: string | null
          "88"?: string | null
          "89"?: string | null
          "9"?: string | null
          "90"?: string | null
          "91"?: string | null
          "92"?: string | null
          "93"?: string | null
          "94"?: string | null
          "95"?: string | null
          "96"?: string | null
          "97"?: string | null
          "98"?: string | null
          "99"?: string | null
          created_at?: string | null
          id?: never
        }
        Relationships: []
      }
      perplexity_leaderboard_1738713061383: {
        Row: {
          "0": string | null
          "1": string | null
          "10": string | null
          "100": string | null
          "101": string | null
          "102": string | null
          "103": string | null
          "104": string | null
          "105": string | null
          "106": string | null
          "107": string | null
          "108": string | null
          "109": string | null
          "11": string | null
          "110": string | null
          "111": string | null
          "112": string | null
          "113": string | null
          "114": string | null
          "115": string | null
          "116": string | null
          "117": string | null
          "118": string | null
          "119": string | null
          "12": string | null
          "120": string | null
          "121": string | null
          "122": string | null
          "123": string | null
          "124": string | null
          "125": string | null
          "126": string | null
          "127": string | null
          "128": string | null
          "129": string | null
          "13": string | null
          "130": string | null
          "131": string | null
          "132": string | null
          "133": string | null
          "134": string | null
          "135": string | null
          "136": string | null
          "137": string | null
          "138": string | null
          "139": string | null
          "14": string | null
          "140": string | null
          "141": string | null
          "142": string | null
          "143": string | null
          "144": string | null
          "145": string | null
          "146": string | null
          "147": string | null
          "148": string | null
          "149": string | null
          "15": string | null
          "150": string | null
          "151": string | null
          "152": string | null
          "153": string | null
          "154": string | null
          "155": string | null
          "156": string | null
          "157": string | null
          "158": string | null
          "159": string | null
          "16": string | null
          "160": string | null
          "161": string | null
          "162": string | null
          "163": string | null
          "164": string | null
          "165": string | null
          "166": string | null
          "167": string | null
          "168": string | null
          "169": string | null
          "17": string | null
          "170": string | null
          "171": string | null
          "172": string | null
          "173": string | null
          "174": string | null
          "175": string | null
          "176": string | null
          "177": string | null
          "178": string | null
          "179": string | null
          "18": string | null
          "180": string | null
          "181": string | null
          "182": string | null
          "183": string | null
          "184": string | null
          "185": string | null
          "186": string | null
          "187": string | null
          "188": string | null
          "189": string | null
          "19": string | null
          "190": string | null
          "2": string | null
          "20": string | null
          "21": string | null
          "22": string | null
          "23": string | null
          "24": string | null
          "25": string | null
          "26": string | null
          "27": string | null
          "28": string | null
          "29": string | null
          "3": string | null
          "30": string | null
          "31": string | null
          "32": string | null
          "33": string | null
          "34": string | null
          "35": string | null
          "36": string | null
          "37": string | null
          "38": string | null
          "39": string | null
          "4": string | null
          "40": string | null
          "41": string | null
          "42": string | null
          "43": string | null
          "44": string | null
          "45": string | null
          "46": string | null
          "47": string | null
          "48": string | null
          "49": string | null
          "5": string | null
          "50": string | null
          "51": string | null
          "52": string | null
          "53": string | null
          "54": string | null
          "55": string | null
          "56": string | null
          "57": string | null
          "58": string | null
          "59": string | null
          "6": string | null
          "60": string | null
          "61": string | null
          "62": string | null
          "63": string | null
          "64": string | null
          "65": string | null
          "66": string | null
          "67": string | null
          "68": string | null
          "69": string | null
          "7": string | null
          "70": string | null
          "71": string | null
          "72": string | null
          "73": string | null
          "74": string | null
          "75": string | null
          "76": string | null
          "77": string | null
          "78": string | null
          "79": string | null
          "8": string | null
          "80": string | null
          "81": string | null
          "82": string | null
          "83": string | null
          "84": string | null
          "85": string | null
          "86": string | null
          "87": string | null
          "88": string | null
          "89": string | null
          "9": string | null
          "90": string | null
          "91": string | null
          "92": string | null
          "93": string | null
          "94": string | null
          "95": string | null
          "96": string | null
          "97": string | null
          "98": string | null
          "99": string | null
          created_at: string | null
          id: number
        }
        Insert: {
          "0"?: string | null
          "1"?: string | null
          "10"?: string | null
          "100"?: string | null
          "101"?: string | null
          "102"?: string | null
          "103"?: string | null
          "104"?: string | null
          "105"?: string | null
          "106"?: string | null
          "107"?: string | null
          "108"?: string | null
          "109"?: string | null
          "11"?: string | null
          "110"?: string | null
          "111"?: string | null
          "112"?: string | null
          "113"?: string | null
          "114"?: string | null
          "115"?: string | null
          "116"?: string | null
          "117"?: string | null
          "118"?: string | null
          "119"?: string | null
          "12"?: string | null
          "120"?: string | null
          "121"?: string | null
          "122"?: string | null
          "123"?: string | null
          "124"?: string | null
          "125"?: string | null
          "126"?: string | null
          "127"?: string | null
          "128"?: string | null
          "129"?: string | null
          "13"?: string | null
          "130"?: string | null
          "131"?: string | null
          "132"?: string | null
          "133"?: string | null
          "134"?: string | null
          "135"?: string | null
          "136"?: string | null
          "137"?: string | null
          "138"?: string | null
          "139"?: string | null
          "14"?: string | null
          "140"?: string | null
          "141"?: string | null
          "142"?: string | null
          "143"?: string | null
          "144"?: string | null
          "145"?: string | null
          "146"?: string | null
          "147"?: string | null
          "148"?: string | null
          "149"?: string | null
          "15"?: string | null
          "150"?: string | null
          "151"?: string | null
          "152"?: string | null
          "153"?: string | null
          "154"?: string | null
          "155"?: string | null
          "156"?: string | null
          "157"?: string | null
          "158"?: string | null
          "159"?: string | null
          "16"?: string | null
          "160"?: string | null
          "161"?: string | null
          "162"?: string | null
          "163"?: string | null
          "164"?: string | null
          "165"?: string | null
          "166"?: string | null
          "167"?: string | null
          "168"?: string | null
          "169"?: string | null
          "17"?: string | null
          "170"?: string | null
          "171"?: string | null
          "172"?: string | null
          "173"?: string | null
          "174"?: string | null
          "175"?: string | null
          "176"?: string | null
          "177"?: string | null
          "178"?: string | null
          "179"?: string | null
          "18"?: string | null
          "180"?: string | null
          "181"?: string | null
          "182"?: string | null
          "183"?: string | null
          "184"?: string | null
          "185"?: string | null
          "186"?: string | null
          "187"?: string | null
          "188"?: string | null
          "189"?: string | null
          "19"?: string | null
          "190"?: string | null
          "2"?: string | null
          "20"?: string | null
          "21"?: string | null
          "22"?: string | null
          "23"?: string | null
          "24"?: string | null
          "25"?: string | null
          "26"?: string | null
          "27"?: string | null
          "28"?: string | null
          "29"?: string | null
          "3"?: string | null
          "30"?: string | null
          "31"?: string | null
          "32"?: string | null
          "33"?: string | null
          "34"?: string | null
          "35"?: string | null
          "36"?: string | null
          "37"?: string | null
          "38"?: string | null
          "39"?: string | null
          "4"?: string | null
          "40"?: string | null
          "41"?: string | null
          "42"?: string | null
          "43"?: string | null
          "44"?: string | null
          "45"?: string | null
          "46"?: string | null
          "47"?: string | null
          "48"?: string | null
          "49"?: string | null
          "5"?: string | null
          "50"?: string | null
          "51"?: string | null
          "52"?: string | null
          "53"?: string | null
          "54"?: string | null
          "55"?: string | null
          "56"?: string | null
          "57"?: string | null
          "58"?: string | null
          "59"?: string | null
          "6"?: string | null
          "60"?: string | null
          "61"?: string | null
          "62"?: string | null
          "63"?: string | null
          "64"?: string | null
          "65"?: string | null
          "66"?: string | null
          "67"?: string | null
          "68"?: string | null
          "69"?: string | null
          "7"?: string | null
          "70"?: string | null
          "71"?: string | null
          "72"?: string | null
          "73"?: string | null
          "74"?: string | null
          "75"?: string | null
          "76"?: string | null
          "77"?: string | null
          "78"?: string | null
          "79"?: string | null
          "8"?: string | null
          "80"?: string | null
          "81"?: string | null
          "82"?: string | null
          "83"?: string | null
          "84"?: string | null
          "85"?: string | null
          "86"?: string | null
          "87"?: string | null
          "88"?: string | null
          "89"?: string | null
          "9"?: string | null
          "90"?: string | null
          "91"?: string | null
          "92"?: string | null
          "93"?: string | null
          "94"?: string | null
          "95"?: string | null
          "96"?: string | null
          "97"?: string | null
          "98"?: string | null
          "99"?: string | null
          created_at?: string | null
          id?: never
        }
        Update: {
          "0"?: string | null
          "1"?: string | null
          "10"?: string | null
          "100"?: string | null
          "101"?: string | null
          "102"?: string | null
          "103"?: string | null
          "104"?: string | null
          "105"?: string | null
          "106"?: string | null
          "107"?: string | null
          "108"?: string | null
          "109"?: string | null
          "11"?: string | null
          "110"?: string | null
          "111"?: string | null
          "112"?: string | null
          "113"?: string | null
          "114"?: string | null
          "115"?: string | null
          "116"?: string | null
          "117"?: string | null
          "118"?: string | null
          "119"?: string | null
          "12"?: string | null
          "120"?: string | null
          "121"?: string | null
          "122"?: string | null
          "123"?: string | null
          "124"?: string | null
          "125"?: string | null
          "126"?: string | null
          "127"?: string | null
          "128"?: string | null
          "129"?: string | null
          "13"?: string | null
          "130"?: string | null
          "131"?: string | null
          "132"?: string | null
          "133"?: string | null
          "134"?: string | null
          "135"?: string | null
          "136"?: string | null
          "137"?: string | null
          "138"?: string | null
          "139"?: string | null
          "14"?: string | null
          "140"?: string | null
          "141"?: string | null
          "142"?: string | null
          "143"?: string | null
          "144"?: string | null
          "145"?: string | null
          "146"?: string | null
          "147"?: string | null
          "148"?: string | null
          "149"?: string | null
          "15"?: string | null
          "150"?: string | null
          "151"?: string | null
          "152"?: string | null
          "153"?: string | null
          "154"?: string | null
          "155"?: string | null
          "156"?: string | null
          "157"?: string | null
          "158"?: string | null
          "159"?: string | null
          "16"?: string | null
          "160"?: string | null
          "161"?: string | null
          "162"?: string | null
          "163"?: string | null
          "164"?: string | null
          "165"?: string | null
          "166"?: string | null
          "167"?: string | null
          "168"?: string | null
          "169"?: string | null
          "17"?: string | null
          "170"?: string | null
          "171"?: string | null
          "172"?: string | null
          "173"?: string | null
          "174"?: string | null
          "175"?: string | null
          "176"?: string | null
          "177"?: string | null
          "178"?: string | null
          "179"?: string | null
          "18"?: string | null
          "180"?: string | null
          "181"?: string | null
          "182"?: string | null
          "183"?: string | null
          "184"?: string | null
          "185"?: string | null
          "186"?: string | null
          "187"?: string | null
          "188"?: string | null
          "189"?: string | null
          "19"?: string | null
          "190"?: string | null
          "2"?: string | null
          "20"?: string | null
          "21"?: string | null
          "22"?: string | null
          "23"?: string | null
          "24"?: string | null
          "25"?: string | null
          "26"?: string | null
          "27"?: string | null
          "28"?: string | null
          "29"?: string | null
          "3"?: string | null
          "30"?: string | null
          "31"?: string | null
          "32"?: string | null
          "33"?: string | null
          "34"?: string | null
          "35"?: string | null
          "36"?: string | null
          "37"?: string | null
          "38"?: string | null
          "39"?: string | null
          "4"?: string | null
          "40"?: string | null
          "41"?: string | null
          "42"?: string | null
          "43"?: string | null
          "44"?: string | null
          "45"?: string | null
          "46"?: string | null
          "47"?: string | null
          "48"?: string | null
          "49"?: string | null
          "5"?: string | null
          "50"?: string | null
          "51"?: string | null
          "52"?: string | null
          "53"?: string | null
          "54"?: string | null
          "55"?: string | null
          "56"?: string | null
          "57"?: string | null
          "58"?: string | null
          "59"?: string | null
          "6"?: string | null
          "60"?: string | null
          "61"?: string | null
          "62"?: string | null
          "63"?: string | null
          "64"?: string | null
          "65"?: string | null
          "66"?: string | null
          "67"?: string | null
          "68"?: string | null
          "69"?: string | null
          "7"?: string | null
          "70"?: string | null
          "71"?: string | null
          "72"?: string | null
          "73"?: string | null
          "74"?: string | null
          "75"?: string | null
          "76"?: string | null
          "77"?: string | null
          "78"?: string | null
          "79"?: string | null
          "8"?: string | null
          "80"?: string | null
          "81"?: string | null
          "82"?: string | null
          "83"?: string | null
          "84"?: string | null
          "85"?: string | null
          "86"?: string | null
          "87"?: string | null
          "88"?: string | null
          "89"?: string | null
          "9"?: string | null
          "90"?: string | null
          "91"?: string | null
          "92"?: string | null
          "93"?: string | null
          "94"?: string | null
          "95"?: string | null
          "96"?: string | null
          "97"?: string | null
          "98"?: string | null
          "99"?: string | null
          created_at?: string | null
          id?: never
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: number
          referral_code: string
          signup_count: number
          strategist_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          referral_code: string
          signup_count?: number
          strategist_id: number
        }
        Update: {
          created_at?: string
          id?: number
          referral_code?: string
          signup_count?: number
          strategist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "referrals_strategist_id_fkey"
            columns: ["strategist_id"]
            isOneToOne: false
            referencedRelation: "strategists"
            referencedColumns: ["id"]
          },
        ]
      }
      strategists: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      webhook_entries: {
        Row: {
          created_at: string
          data: Json
          id: number
        }
        Insert: {
          created_at?: string
          data: Json
          id?: number
        }
        Update: {
          created_at?: string
          data?: Json
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_dynamic_table: {
        Args: {
          sql_command: string
        }
        Returns: undefined
      }
      increment_signup_count: {
        Args: {
          ref_code: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
