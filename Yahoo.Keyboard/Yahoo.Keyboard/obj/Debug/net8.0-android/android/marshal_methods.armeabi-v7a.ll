; ModuleID = 'marshal_methods.armeabi-v7a.ll'
source_filename = "marshal_methods.armeabi-v7a.ll"
target datalayout = "e-m:e-p:32:32-Fi8-i64:64-v128:64:128-a:0:32-n32-S64"
target triple = "armv7-unknown-linux-android21"

%struct.MarshalMethodName = type {
	i64, ; uint64_t id
	ptr ; char* name
}

%struct.MarshalMethodsManagedClass = type {
	i32, ; uint32_t token
	ptr ; MonoClass klass
}

@assembly_image_cache = dso_local local_unnamed_addr global [202 x ptr] zeroinitializer, align 4

; Each entry maps hash of an assembly name to an index into the `assembly_image_cache` array
@assembly_image_cache_hashes = dso_local local_unnamed_addr constant [398 x i32] [
	i32 2616222, ; 0: System.Net.NetworkInformation.dll => 0x27eb9e => 68
	i32 10166715, ; 1: System.Net.NameResolution.dll => 0x9b21bb => 67
	i32 15721112, ; 2: System.Runtime.Intrinsics.dll => 0xefe298 => 108
	i32 32687329, ; 3: Xamarin.AndroidX.Lifecycle.Runtime => 0x1f2c4e1 => 184
	i32 34715100, ; 4: Xamarin.Google.Guava.ListenableFuture.dll => 0x211b5dc => 190
	i32 34839235, ; 5: System.IO.FileSystem.DriveInfo => 0x2139ac3 => 48
	i32 39485524, ; 6: System.Net.WebSockets.dll => 0x25a8054 => 80
	i32 42639949, ; 7: System.Threading.Thread => 0x28aa24d => 145
	i32 66541672, ; 8: System.Diagnostics.StackTrace => 0x3f75868 => 30
	i32 68219467, ; 9: System.Security.Cryptography.Primitives => 0x410f24b => 124
	i32 82292897, ; 10: System.Runtime.CompilerServices.VisualC.dll => 0x4e7b0a1 => 102
	i32 117431740, ; 11: System.Runtime.InteropServices => 0x6ffddbc => 107
	i32 122350210, ; 12: System.Threading.Channels.dll => 0x74aea82 => 139
	i32 134690465, ; 13: Xamarin.Kotlin.StdLib.Jdk7.dll => 0x80736a1 => 194
	i32 142721839, ; 14: System.Net.WebHeaderCollection => 0x881c32f => 77
	i32 149972175, ; 15: System.Security.Cryptography.Primitives.dll => 0x8f064cf => 124
	i32 159306688, ; 16: System.ComponentModel.Annotations => 0x97ed3c0 => 13
	i32 165246403, ; 17: Xamarin.AndroidX.Collection.dll => 0x9d975c3 => 178
	i32 176265551, ; 18: System.ServiceProcess => 0xa81994f => 132
	i32 184328833, ; 19: System.ValueTuple.dll => 0xafca281 => 151
	i32 202881255, ; 20: Yahoo.Keyboard.dll => 0xc17b8e7 => 0
	i32 205061960, ; 21: System.ComponentModel => 0xc38ff48 => 18
	i32 220171995, ; 22: System.Diagnostics.Debug => 0xd1f8edb => 26
	i32 230752869, ; 23: Microsoft.CSharp.dll => 0xdc10265 => 1
	i32 231409092, ; 24: System.Linq.Parallel => 0xdcb05c4 => 59
	i32 231814094, ; 25: System.Globalization => 0xdd133ce => 42
	i32 246610117, ; 26: System.Reflection.Emit.Lightweight => 0xeb2f8c5 => 91
	i32 276479776, ; 27: System.Threading.Timer.dll => 0x107abf20 => 147
	i32 280482487, ; 28: Xamarin.AndroidX.Interpolator => 0x10b7d2b7 => 182
	i32 291076382, ; 29: System.IO.Pipes.AccessControl.dll => 0x1159791e => 54
	i32 298918909, ; 30: System.Net.Ping.dll => 0x11d123fd => 69
	i32 321597661, ; 31: System.Numerics => 0x132b30dd => 83
	i32 342366114, ; 32: Xamarin.AndroidX.Lifecycle.Common => 0x146817a2 => 183
	i32 360082299, ; 33: System.ServiceModel.Web => 0x15766b7b => 131
	i32 367780167, ; 34: System.IO.Pipes => 0x15ebe147 => 55
	i32 374914964, ; 35: System.Transactions.Local => 0x1658bf94 => 149
	i32 375677976, ; 36: System.Net.ServicePoint.dll => 0x16646418 => 74
	i32 379916513, ; 37: System.Threading.Thread.dll => 0x16a510e1 => 145
	i32 385762202, ; 38: System.Memory.dll => 0x16fe439a => 62
	i32 392610295, ; 39: System.Threading.ThreadPool.dll => 0x1766c1f7 => 146
	i32 395744057, ; 40: _Microsoft.Android.Resource.Designer => 0x17969339 => 198
	i32 403441872, ; 41: WindowsBase => 0x180c08d0 => 165
	i32 442565967, ; 42: System.Collections => 0x1a61054f => 12
	i32 451504562, ; 43: System.Security.Cryptography.X509Certificates => 0x1ae969b2 => 125
	i32 456227837, ; 44: System.Web.HttpUtility.dll => 0x1b317bfd => 152
	i32 459347974, ; 45: System.Runtime.Serialization.Primitives.dll => 0x1b611806 => 113
	i32 465846621, ; 46: mscorlib => 0x1bc4415d => 166
	i32 469710990, ; 47: System.dll => 0x1bff388e => 164
	i32 476646585, ; 48: Xamarin.AndroidX.Interpolator.dll => 0x1c690cb9 => 182
	i32 498788369, ; 49: System.ObjectModel => 0x1dbae811 => 84
	i32 526420162, ; 50: System.Transactions.dll => 0x1f6088c2 => 150
	i32 527452488, ; 51: Xamarin.Kotlin.StdLib.Jdk7 => 0x1f704948 => 194
	i32 530272170, ; 52: System.Linq.Queryable => 0x1f9b4faa => 60
	i32 540030774, ; 53: System.IO.FileSystem.dll => 0x20303736 => 51
	i32 545304856, ; 54: System.Runtime.Extensions => 0x2080b118 => 103
	i32 546455878, ; 55: System.Runtime.Serialization.Xml => 0x20924146 => 114
	i32 549171840, ; 56: System.Globalization.Calendars => 0x20bbb280 => 40
	i32 577335427, ; 57: System.Security.Cryptography.Cng => 0x22697083 => 120
	i32 601371474, ; 58: System.IO.IsolatedStorage.dll => 0x23d83352 => 52
	i32 605376203, ; 59: System.IO.Compression.FileSystem => 0x24154ecb => 44
	i32 613668793, ; 60: System.Security.Cryptography.Algorithms => 0x2493d7b9 => 119
	i32 643868501, ; 61: System.Net => 0x2660a755 => 81
	i32 662205335, ; 62: System.Text.Encodings.Web.dll => 0x27787397 => 136
	i32 663517072, ; 63: Xamarin.AndroidX.VersionedParcelable => 0x278c7790 => 189
	i32 666292255, ; 64: Xamarin.AndroidX.Arch.Core.Common.dll => 0x27b6d01f => 176
	i32 672442732, ; 65: System.Collections.Concurrent => 0x2814a96c => 8
	i32 683518922, ; 66: System.Net.Security => 0x28bdabca => 73
	i32 690569205, ; 67: System.Xml.Linq.dll => 0x29293ff5 => 155
	i32 691348768, ; 68: Xamarin.KotlinX.Coroutines.Android.dll => 0x29352520 => 196
	i32 693804605, ; 69: System.Windows => 0x295a9e3d => 154
	i32 699345723, ; 70: System.Reflection.Emit => 0x29af2b3b => 92
	i32 700284507, ; 71: Xamarin.Jetbrains.Annotations => 0x29bd7e5b => 191
	i32 700358131, ; 72: System.IO.Compression.ZipFile => 0x29be9df3 => 45
	i32 720511267, ; 73: Xamarin.Kotlin.StdLib.Jdk8 => 0x2af22123 => 195
	i32 722857257, ; 74: System.Runtime.Loader.dll => 0x2b15ed29 => 109
	i32 735137430, ; 75: System.Security.SecureString.dll => 0x2bd14e96 => 129
	i32 752232764, ; 76: System.Diagnostics.Contracts.dll => 0x2cd6293c => 25
	i32 759454413, ; 77: System.Net.Requests => 0x2d445acd => 72
	i32 762598435, ; 78: System.IO.Pipes.dll => 0x2d745423 => 55
	i32 775507847, ; 79: System.IO.Compression => 0x2e394f87 => 46
	i32 804715423, ; 80: System.Data.Common => 0x2ff6fb9f => 22
	i32 823281589, ; 81: System.Private.Uri.dll => 0x311247b5 => 86
	i32 830298997, ; 82: System.IO.Compression.Brotli => 0x317d5b75 => 43
	i32 832635846, ; 83: System.Xml.XPath.dll => 0x31a103c6 => 160
	i32 834051424, ; 84: System.Net.Quic => 0x31b69d60 => 71
	i32 873119928, ; 85: Microsoft.VisualBasic => 0x340ac0b8 => 3
	i32 877678880, ; 86: System.Globalization.dll => 0x34505120 => 42
	i32 878954865, ; 87: System.Net.Http.Json => 0x3463c971 => 63
	i32 904024072, ; 88: System.ComponentModel.Primitives.dll => 0x35e25008 => 16
	i32 911108515, ; 89: System.IO.MemoryMappedFiles.dll => 0x364e69a3 => 53
	i32 928116545, ; 90: Xamarin.Google.Guava.ListenableFuture => 0x3751ef41 => 190
	i32 952186615, ; 91: System.Runtime.InteropServices.JavaScript.dll => 0x38c136f7 => 105
	i32 956575887, ; 92: Xamarin.Kotlin.StdLib.Jdk8.dll => 0x3904308f => 195
	i32 967690846, ; 93: Xamarin.AndroidX.Lifecycle.Common.dll => 0x39adca5e => 183
	i32 975236339, ; 94: System.Diagnostics.Tracing => 0x3a20ecf3 => 34
	i32 975874589, ; 95: System.Xml.XDocument => 0x3a2aaa1d => 158
	i32 986514023, ; 96: System.Private.DataContractSerialization.dll => 0x3acd0267 => 85
	i32 987214855, ; 97: System.Diagnostics.Tools => 0x3ad7b407 => 32
	i32 992768348, ; 98: System.Collections.dll => 0x3b2c715c => 12
	i32 994442037, ; 99: System.IO.FileSystem => 0x3b45fb35 => 51
	i32 1001831731, ; 100: System.IO.UnmanagedMemoryStream.dll => 0x3bb6bd33 => 56
	i32 1019214401, ; 101: System.Drawing => 0x3cbffa41 => 36
	i32 1036536393, ; 102: System.Drawing.Primitives.dll => 0x3dc84a49 => 35
	i32 1044663988, ; 103: System.Linq.Expressions.dll => 0x3e444eb4 => 58
	i32 1082857460, ; 104: System.ComponentModel.TypeConverter => 0x408b17f4 => 17
	i32 1084122840, ; 105: Xamarin.Kotlin.StdLib => 0x409e66d8 => 192
	i32 1098259244, ; 106: System => 0x41761b2c => 164
	i32 1170634674, ; 107: System.Web.dll => 0x45c677b2 => 153
	i32 1204270330, ; 108: Xamarin.AndroidX.Arch.Core.Common => 0x47c7b4fa => 176
	i32 1208641965, ; 109: System.Diagnostics.Process => 0x480a69ad => 29
	i32 1219128291, ; 110: System.IO.IsolatedStorage => 0x48aa6be3 => 52
	i32 1246548578, ; 111: Xamarin.AndroidX.Collection.Jvm.dll => 0x4a4cd262 => 179
	i32 1253011324, ; 112: Microsoft.Win32.Registry => 0x4aaf6f7c => 5
	i32 1264511973, ; 113: Xamarin.AndroidX.Startup.StartupRuntime.dll => 0x4b5eebe5 => 187
	i32 1275534314, ; 114: Xamarin.KotlinX.Coroutines.Android => 0x4c071bea => 196
	i32 1278448581, ; 115: Xamarin.AndroidX.Annotation.Jvm => 0x4c3393c5 => 175
	i32 1309188875, ; 116: System.Private.DataContractSerialization => 0x4e08a30b => 85
	i32 1324164729, ; 117: System.Linq => 0x4eed2679 => 61
	i32 1335329327, ; 118: System.Runtime.Serialization.Json.dll => 0x4f97822f => 112
	i32 1364015309, ; 119: System.IO => 0x514d38cd => 57
	i32 1379779777, ; 120: System.Resources.ResourceManager => 0x523dc4c1 => 99
	i32 1402170036, ; 121: System.Configuration.dll => 0x53936ab4 => 19
	i32 1408764838, ; 122: System.Runtime.Serialization.Formatters.dll => 0x53f80ba6 => 111
	i32 1411638395, ; 123: System.Runtime.CompilerServices.Unsafe => 0x5423e47b => 101
	i32 1422545099, ; 124: System.Runtime.CompilerServices.VisualC => 0x54ca50cb => 102
	i32 1434145427, ; 125: System.Runtime.Handles => 0x557b5293 => 104
	i32 1439761251, ; 126: System.Net.Quic.dll => 0x55d10363 => 71
	i32 1452070440, ; 127: System.Formats.Asn1.dll => 0x568cd628 => 38
	i32 1453312822, ; 128: System.Diagnostics.Tools.dll => 0x569fcb36 => 32
	i32 1457743152, ; 129: System.Runtime.Extensions.dll => 0x56e36530 => 103
	i32 1458022317, ; 130: System.Net.Security.dll => 0x56e7a7ad => 73
	i32 1461234159, ; 131: System.Collections.Immutable.dll => 0x5718a9ef => 9
	i32 1461719063, ; 132: System.Security.Cryptography.OpenSsl => 0x57201017 => 123
	i32 1462112819, ; 133: System.IO.Compression.dll => 0x57261233 => 46
	i32 1479771757, ; 134: System.Collections.Immutable => 0x5833866d => 9
	i32 1480492111, ; 135: System.IO.Compression.Brotli.dll => 0x583e844f => 43
	i32 1487239319, ; 136: Microsoft.Win32.Primitives => 0x58a57897 => 4
	i32 1536373174, ; 137: System.Diagnostics.TextWriterTraceListener => 0x5b9331b6 => 31
	i32 1543031311, ; 138: System.Text.RegularExpressions.dll => 0x5bf8ca0f => 138
	i32 1543355203, ; 139: System.Reflection.Emit.dll => 0x5bfdbb43 => 92
	i32 1550322496, ; 140: System.Reflection.Extensions.dll => 0x5c680b40 => 93
	i32 1565862583, ; 141: System.IO.FileSystem.Primitives => 0x5d552ab7 => 49
	i32 1566207040, ; 142: System.Threading.Tasks.Dataflow.dll => 0x5d5a6c40 => 141
	i32 1573704789, ; 143: System.Runtime.Serialization.Json => 0x5dccd455 => 112
	i32 1580037396, ; 144: System.Threading.Overlapped => 0x5e2d7514 => 140
	i32 1592978981, ; 145: System.Runtime.Serialization.dll => 0x5ef2ee25 => 115
	i32 1601112923, ; 146: System.Xml.Serialization => 0x5f6f0b5b => 157
	i32 1604827217, ; 147: System.Net.WebClient => 0x5fa7b851 => 76
	i32 1618516317, ; 148: System.Net.WebSockets.Client.dll => 0x6078995d => 79
	i32 1622358360, ; 149: System.Dynamic.Runtime => 0x60b33958 => 37
	i32 1639515021, ; 150: System.Net.Http.dll => 0x61b9038d => 64
	i32 1639986890, ; 151: System.Text.RegularExpressions => 0x61c036ca => 138
	i32 1641389582, ; 152: System.ComponentModel.EventBasedAsync.dll => 0x61d59e0e => 15
	i32 1657153582, ; 153: System.Runtime => 0x62c6282e => 116
	i32 1658241508, ; 154: Xamarin.AndroidX.Tracing.Tracing.dll => 0x62d6c1e4 => 188
	i32 1675553242, ; 155: System.IO.FileSystem.DriveInfo.dll => 0x63dee9da => 48
	i32 1677501392, ; 156: System.Net.Primitives.dll => 0x63fca3d0 => 70
	i32 1678508291, ; 157: System.Net.WebSockets => 0x640c0103 => 80
	i32 1679769178, ; 158: System.Security.Cryptography => 0x641f3e5a => 126
	i32 1691477237, ; 159: System.Reflection.Metadata => 0x64d1e4f5 => 94
	i32 1696967625, ; 160: System.Security.Cryptography.Csp => 0x6525abc9 => 121
	i32 1698840827, ; 161: Xamarin.Kotlin.StdLib.Common => 0x654240fb => 193
	i32 1701541528, ; 162: System.Diagnostics.Debug.dll => 0x656b7698 => 26
	i32 1726116996, ; 163: System.Reflection.dll => 0x66e27484 => 97
	i32 1728033016, ; 164: System.Diagnostics.FileVersionInfo.dll => 0x66ffb0f8 => 28
	i32 1744735666, ; 165: System.Transactions.Local.dll => 0x67fe8db2 => 149
	i32 1746316138, ; 166: Mono.Android.Export => 0x6816ab6a => 169
	i32 1750313021, ; 167: Microsoft.Win32.Primitives.dll => 0x6853a83d => 4
	i32 1758240030, ; 168: System.Resources.Reader.dll => 0x68cc9d1e => 98
	i32 1763938596, ; 169: System.Diagnostics.TraceSource.dll => 0x69239124 => 33
	i32 1765942094, ; 170: System.Reflection.Extensions => 0x6942234e => 93
	i32 1776026572, ; 171: System.Core.dll => 0x69dc03cc => 21
	i32 1777075843, ; 172: System.Globalization.Extensions.dll => 0x69ec0683 => 41
	i32 1780572499, ; 173: Mono.Android.Runtime.dll => 0x6a216153 => 170
	i32 1813058853, ; 174: Xamarin.Kotlin.StdLib.dll => 0x6c111525 => 192
	i32 1818787751, ; 175: Microsoft.VisualBasic.Core => 0x6c687fa7 => 2
	i32 1824175904, ; 176: System.Text.Encoding.Extensions => 0x6cbab720 => 134
	i32 1824722060, ; 177: System.Runtime.Serialization.Formatters => 0x6cc30c8c => 111
	i32 1858542181, ; 178: System.Linq.Expressions => 0x6ec71a65 => 58
	i32 1870277092, ; 179: System.Reflection.Primitives => 0x6f7a29e4 => 95
	i32 1879696579, ; 180: System.Formats.Tar.dll => 0x7009e4c3 => 39
	i32 1885316902, ; 181: Xamarin.AndroidX.Arch.Core.Runtime.dll => 0x705fa726 => 177
	i32 1888955245, ; 182: System.Diagnostics.Contracts => 0x70972b6d => 25
	i32 1889954781, ; 183: System.Reflection.Metadata.dll => 0x70a66bdd => 94
	i32 1898237753, ; 184: System.Reflection.DispatchProxy => 0x7124cf39 => 89
	i32 1900610850, ; 185: System.Resources.ResourceManager.dll => 0x71490522 => 99
	i32 1910275211, ; 186: System.Collections.NonGeneric.dll => 0x71dc7c8b => 10
	i32 1919157823, ; 187: Xamarin.AndroidX.MultiDex.dll => 0x7264063f => 185
	i32 1939592360, ; 188: System.Private.Xml.Linq => 0x739bd4a8 => 87
	i32 1956758971, ; 189: System.Resources.Writer => 0x74a1c5bb => 100
	i32 1983156543, ; 190: Xamarin.Kotlin.StdLib.Common.dll => 0x7634913f => 193
	i32 2011961780, ; 191: System.Buffers.dll => 0x77ec19b4 => 7
	i32 2045470958, ; 192: System.Private.Xml => 0x79eb68ee => 88
	i32 2060060697, ; 193: System.Windows.dll => 0x7aca0819 => 154
	i32 2070888862, ; 194: System.Diagnostics.TraceSource => 0x7b6f419e => 33
	i32 2079903147, ; 195: System.Runtime.dll => 0x7bf8cdab => 116
	i32 2090596640, ; 196: System.Numerics.Vectors => 0x7c9bf920 => 82
	i32 2127167465, ; 197: System.Console => 0x7ec9ffe9 => 20
	i32 2142473426, ; 198: System.Collections.Specialized => 0x7fb38cd2 => 11
	i32 2143790110, ; 199: System.Xml.XmlSerializer.dll => 0x7fc7a41e => 162
	i32 2146852085, ; 200: Microsoft.VisualBasic.dll => 0x7ff65cf5 => 3
	i32 2193016926, ; 201: System.ObjectModel.dll => 0x82b6c85e => 84
	i32 2201107256, ; 202: Xamarin.KotlinX.Coroutines.Core.Jvm.dll => 0x83323b38 => 197
	i32 2201231467, ; 203: System.Net.Http => 0x8334206b => 64
	i32 2222056684, ; 204: System.Threading.Tasks.Parallel => 0x8471e4ec => 143
	i32 2252106437, ; 205: System.Xml.Serialization.dll => 0x863c6ac5 => 157
	i32 2256313426, ; 206: System.Globalization.Extensions => 0x867c9c52 => 41
	i32 2256548716, ; 207: Xamarin.AndroidX.MultiDex => 0x8680336c => 185
	i32 2265110946, ; 208: System.Security.AccessControl.dll => 0x8702d9a2 => 117
	i32 2293034957, ; 209: System.ServiceModel.Web.dll => 0x88acefcd => 131
	i32 2295906218, ; 210: System.Net.Sockets => 0x88d8bfaa => 75
	i32 2298471582, ; 211: System.Net.Mail => 0x88ffe49e => 66
	i32 2305521784, ; 212: System.Private.CoreLib.dll => 0x896b7878 => 172
	i32 2315684594, ; 213: Xamarin.AndroidX.Annotation.dll => 0x8a068af2 => 173
	i32 2320631194, ; 214: System.Threading.Tasks.Parallel.dll => 0x8a52059a => 143
	i32 2340441535, ; 215: System.Runtime.InteropServices.RuntimeInformation.dll => 0x8b804dbf => 106
	i32 2344264397, ; 216: System.ValueTuple => 0x8bbaa2cd => 151
	i32 2353062107, ; 217: System.Net.Primitives => 0x8c40e0db => 70
	i32 2368005991, ; 218: System.Xml.ReaderWriter.dll => 0x8d24e767 => 156
	i32 2378619854, ; 219: System.Security.Cryptography.Csp.dll => 0x8dc6dbce => 121
	i32 2383496789, ; 220: System.Security.Principal.Windows.dll => 0x8e114655 => 127
	i32 2401565422, ; 221: System.Web.HttpUtility => 0x8f24faee => 152
	i32 2421380589, ; 222: System.Threading.Tasks.Dataflow => 0x905355ed => 141
	i32 2435356389, ; 223: System.Console.dll => 0x912896e5 => 20
	i32 2435904999, ; 224: System.ComponentModel.DataAnnotations.dll => 0x9130f5e7 => 14
	i32 2454642406, ; 225: System.Text.Encoding.dll => 0x924edee6 => 135
	i32 2458678730, ; 226: System.Net.Sockets.dll => 0x928c75ca => 75
	i32 2459001652, ; 227: System.Linq.Parallel.dll => 0x92916334 => 59
	i32 2471841756, ; 228: netstandard.dll => 0x93554fdc => 167
	i32 2475788418, ; 229: Java.Interop.dll => 0x93918882 => 168
	i32 2483903535, ; 230: System.ComponentModel.EventBasedAsync => 0x940d5c2f => 15
	i32 2484371297, ; 231: System.Net.ServicePoint => 0x94147f61 => 74
	i32 2490993605, ; 232: System.AppContext.dll => 0x94798bc5 => 6
	i32 2501346920, ; 233: System.Data.DataSetExtensions => 0x95178668 => 23
	i32 2505896520, ; 234: Xamarin.AndroidX.Lifecycle.Runtime.dll => 0x955cf248 => 184
	i32 2538310050, ; 235: System.Reflection.Emit.Lightweight.dll => 0x974b89a2 => 91
	i32 2562349572, ; 236: Microsoft.CSharp => 0x98ba5a04 => 1
	i32 2570120770, ; 237: System.Text.Encodings.Web => 0x9930ee42 => 136
	i32 2580605308, ; 238: Yahoo.Keyboard => 0x99d0e97c => 0
	i32 2585220780, ; 239: System.Text.Encoding.Extensions.dll => 0x9a1756ac => 134
	i32 2585805581, ; 240: System.Net.Ping => 0x9a20430d => 69
	i32 2589602615, ; 241: System.Threading.ThreadPool => 0x9a5a3337 => 146
	i32 2605712449, ; 242: Xamarin.KotlinX.Coroutines.Core.Jvm => 0x9b500441 => 197
	i32 2617129537, ; 243: System.Private.Xml.dll => 0x9bfe3a41 => 88
	i32 2618712057, ; 244: System.Reflection.TypeExtensions.dll => 0x9c165ff9 => 96
	i32 2627185994, ; 245: System.Diagnostics.TextWriterTraceListener.dll => 0x9c97ad4a => 31
	i32 2629843544, ; 246: System.IO.Compression.ZipFile.dll => 0x9cc03a58 => 45
	i32 2663698177, ; 247: System.Runtime.Loader => 0x9ec4cf01 => 109
	i32 2664396074, ; 248: System.Xml.XDocument.dll => 0x9ecf752a => 158
	i32 2665622720, ; 249: System.Drawing.Primitives => 0x9ee22cc0 => 35
	i32 2676780864, ; 250: System.Data.Common.dll => 0x9f8c6f40 => 22
	i32 2686887180, ; 251: System.Runtime.Serialization.Xml.dll => 0xa026a50c => 114
	i32 2693849962, ; 252: System.IO.dll => 0xa090e36a => 57
	i32 2701096212, ; 253: Xamarin.AndroidX.Tracing.Tracing => 0xa0ff7514 => 188
	i32 2715334215, ; 254: System.Threading.Tasks.dll => 0xa1d8b647 => 144
	i32 2717744543, ; 255: System.Security.Claims => 0xa1fd7d9f => 118
	i32 2719963679, ; 256: System.Security.Cryptography.Cng.dll => 0xa21f5a1f => 120
	i32 2724373263, ; 257: System.Runtime.Numerics.dll => 0xa262a30f => 110
	i32 2735172069, ; 258: System.Threading.Channels => 0xa30769e5 => 139
	i32 2740948882, ; 259: System.IO.Pipes.AccessControl => 0xa35f8f92 => 54
	i32 2748088231, ; 260: System.Runtime.InteropServices.JavaScript => 0xa3cc7fa7 => 105
	i32 2765824710, ; 261: System.Text.Encoding.CodePages.dll => 0xa4db22c6 => 133
	i32 2770495804, ; 262: Xamarin.Jetbrains.Annotations.dll => 0xa522693c => 191
	i32 2803228030, ; 263: System.Xml.XPath.XDocument.dll => 0xa715dd7e => 159
	i32 2819470561, ; 264: System.Xml.dll => 0xa80db4e1 => 163
	i32 2821205001, ; 265: System.ServiceProcess.dll => 0xa8282c09 => 132
	i32 2824502124, ; 266: System.Xml.XmlDocument => 0xa85a7b6c => 161
	i32 2849599387, ; 267: System.Threading.Overlapped.dll => 0xa9d96f9b => 140
	i32 2861098320, ; 268: Mono.Android.Export.dll => 0xaa88e550 => 169
	i32 2875220617, ; 269: System.Globalization.Calendars.dll => 0xab606289 => 40
	i32 2887636118, ; 270: System.Net.dll => 0xac1dd496 => 81
	i32 2899753641, ; 271: System.IO.UnmanagedMemoryStream => 0xacd6baa9 => 56
	i32 2900621748, ; 272: System.Dynamic.Runtime.dll => 0xace3f9b4 => 37
	i32 2901442782, ; 273: System.Reflection => 0xacf080de => 97
	i32 2905242038, ; 274: mscorlib.dll => 0xad2a79b6 => 166
	i32 2909740682, ; 275: System.Private.CoreLib => 0xad6f1e8a => 172
	i32 2919462931, ; 276: System.Numerics.Vectors.dll => 0xae037813 => 82
	i32 2921128767, ; 277: Xamarin.AndroidX.Annotation.Experimental.dll => 0xae1ce33f => 174
	i32 2936416060, ; 278: System.Resources.Reader => 0xaf06273c => 98
	i32 2940926066, ; 279: System.Diagnostics.StackTrace.dll => 0xaf4af872 => 30
	i32 2942453041, ; 280: System.Xml.XPath.XDocument => 0xaf624531 => 159
	i32 2959614098, ; 281: System.ComponentModel.dll => 0xb0682092 => 18
	i32 2968338931, ; 282: System.Security.Principal.Windows => 0xb0ed41f3 => 127
	i32 2972252294, ; 283: System.Security.Cryptography.Algorithms.dll => 0xb128f886 => 119
	i32 3016983068, ; 284: Xamarin.AndroidX.Startup.StartupRuntime => 0xb3d3821c => 187
	i32 3023353419, ; 285: WindowsBase.dll => 0xb434b64b => 165
	i32 3038032645, ; 286: _Microsoft.Android.Resource.Designer.dll => 0xb514b305 => 198
	i32 3059408633, ; 287: Mono.Android.Runtime => 0xb65adef9 => 170
	i32 3059793426, ; 288: System.ComponentModel.Primitives => 0xb660be12 => 16
	i32 3075834255, ; 289: System.Threading.Tasks => 0xb755818f => 144
	i32 3090735792, ; 290: System.Security.Cryptography.X509Certificates.dll => 0xb838e2b0 => 125
	i32 3099732863, ; 291: System.Security.Claims.dll => 0xb8c22b7f => 118
	i32 3103600923, ; 292: System.Formats.Asn1 => 0xb8fd311b => 38
	i32 3111772706, ; 293: System.Runtime.Serialization => 0xb979e222 => 115
	i32 3121463068, ; 294: System.IO.FileSystem.AccessControl.dll => 0xba0dbf1c => 47
	i32 3124832203, ; 295: System.Threading.Tasks.Extensions => 0xba4127cb => 142
	i32 3132293585, ; 296: System.Security.AccessControl => 0xbab301d1 => 117
	i32 3147165239, ; 297: System.Diagnostics.Tracing.dll => 0xbb95ee37 => 34
	i32 3159123045, ; 298: System.Reflection.Primitives.dll => 0xbc4c6465 => 95
	i32 3160747431, ; 299: System.IO.MemoryMappedFiles => 0xbc652da7 => 53
	i32 3192346100, ; 300: System.Security.SecureString => 0xbe4755f4 => 129
	i32 3193515020, ; 301: System.Web => 0xbe592c0c => 153
	i32 3204380047, ; 302: System.Data.dll => 0xbefef58f => 24
	i32 3209718065, ; 303: System.Xml.XmlDocument.dll => 0xbf506931 => 161
	i32 3220365878, ; 304: System.Threading => 0xbff2e236 => 148
	i32 3226221578, ; 305: System.Runtime.Handles.dll => 0xc04c3c0a => 104
	i32 3251039220, ; 306: System.Reflection.DispatchProxy.dll => 0xc1c6ebf4 => 89
	i32 3265493905, ; 307: System.Linq.Queryable.dll => 0xc2a37b91 => 60
	i32 3265893370, ; 308: System.Threading.Tasks.Extensions.dll => 0xc2a993fa => 142
	i32 3277815716, ; 309: System.Resources.Writer.dll => 0xc35f7fa4 => 100
	i32 3279906254, ; 310: Microsoft.Win32.Registry.dll => 0xc37f65ce => 5
	i32 3280506390, ; 311: System.ComponentModel.Annotations.dll => 0xc3888e16 => 13
	i32 3290767353, ; 312: System.Security.Cryptography.Encoding => 0xc4251ff9 => 122
	i32 3299363146, ; 313: System.Text.Encoding => 0xc4a8494a => 135
	i32 3303498502, ; 314: System.Diagnostics.FileVersionInfo => 0xc4e76306 => 28
	i32 3316684772, ; 315: System.Net.Requests.dll => 0xc5b097e4 => 72
	i32 3317144872, ; 316: System.Data => 0xc5b79d28 => 24
	i32 3340431453, ; 317: Xamarin.AndroidX.Arch.Core.Runtime => 0xc71af05d => 177
	i32 3345895724, ; 318: Xamarin.AndroidX.ProfileInstaller.ProfileInstaller.dll => 0xc76e512c => 186
	i32 3358260929, ; 319: System.Text.Json => 0xc82afec1 => 137
	i32 3362522851, ; 320: Xamarin.AndroidX.Core => 0xc86c06e3 => 181
	i32 3366347497, ; 321: Java.Interop => 0xc8a662e9 => 168
	i32 3395150330, ; 322: System.Runtime.CompilerServices.Unsafe.dll => 0xca5de1fa => 101
	i32 3403906625, ; 323: System.Security.Cryptography.OpenSsl.dll => 0xcae37e41 => 123
	i32 3429136800, ; 324: System.Xml => 0xcc6479a0 => 163
	i32 3430777524, ; 325: netstandard => 0xcc7d82b4 => 167
	i32 3445260447, ; 326: System.Formats.Tar => 0xcd5a809f => 39
	i32 3471940407, ; 327: System.ComponentModel.TypeConverter.dll => 0xcef19b37 => 17
	i32 3476120550, ; 328: Mono.Android => 0xcf3163e6 => 171
	i32 3485117614, ; 329: System.Text.Json.dll => 0xcfbaacae => 137
	i32 3486566296, ; 330: System.Transactions => 0xcfd0c798 => 150
	i32 3493954962, ; 331: Xamarin.AndroidX.Concurrent.Futures.dll => 0xd0418592 => 180
	i32 3509114376, ; 332: System.Xml.Linq => 0xd128d608 => 155
	i32 3515174580, ; 333: System.Security.dll => 0xd1854eb4 => 130
	i32 3530912306, ; 334: System.Configuration => 0xd2757232 => 19
	i32 3539954161, ; 335: System.Net.HttpListener => 0xd2ff69f1 => 65
	i32 3560100363, ; 336: System.Threading.Timer => 0xd432d20b => 147
	i32 3570554715, ; 337: System.IO.FileSystem.AccessControl => 0xd4d2575b => 47
	i32 3598340787, ; 338: System.Net.WebSockets.Client => 0xd67a52b3 => 79
	i32 3608519521, ; 339: System.Linq.dll => 0xd715a361 => 61
	i32 3624195450, ; 340: System.Runtime.InteropServices.RuntimeInformation => 0xd804d57a => 106
	i32 3633644679, ; 341: Xamarin.AndroidX.Annotation.Experimental => 0xd8950487 => 174
	i32 3638274909, ; 342: System.IO.FileSystem.Primitives.dll => 0xd8dbab5d => 49
	i32 3645089577, ; 343: System.ComponentModel.DataAnnotations => 0xd943a729 => 14
	i32 3660523487, ; 344: System.Net.NetworkInformation => 0xda2f27df => 68
	i32 3672681054, ; 345: Mono.Android.dll => 0xdae8aa5e => 171
	i32 3684561358, ; 346: Xamarin.AndroidX.Concurrent.Futures => 0xdb9df1ce => 180
	i32 3700866549, ; 347: System.Net.WebProxy.dll => 0xdc96bdf5 => 78
	i32 3716563718, ; 348: System.Runtime.Intrinsics => 0xdd864306 => 108
	i32 3718780102, ; 349: Xamarin.AndroidX.Annotation => 0xdda814c6 => 173
	i32 3732100267, ; 350: System.Net.NameResolution => 0xde7354ab => 67
	i32 3737834244, ; 351: System.Net.Http.Json.dll => 0xdecad304 => 63
	i32 3748608112, ; 352: System.Diagnostics.DiagnosticSource => 0xdf6f3870 => 27
	i32 3751444290, ; 353: System.Xml.XPath => 0xdf9a7f42 => 160
	i32 3786282454, ; 354: Xamarin.AndroidX.Collection => 0xe1ae15d6 => 178
	i32 3792276235, ; 355: System.Collections.NonGeneric => 0xe2098b0b => 10
	i32 3802395368, ; 356: System.Collections.Specialized.dll => 0xe2a3f2e8 => 11
	i32 3819260425, ; 357: System.Net.WebProxy => 0xe3a54a09 => 78
	i32 3823082795, ; 358: System.Security.Cryptography.dll => 0xe3df9d2b => 126
	i32 3829621856, ; 359: System.Numerics.dll => 0xe4436460 => 83
	i32 3844307129, ; 360: System.Net.Mail.dll => 0xe52378b9 => 66
	i32 3849253459, ; 361: System.Runtime.InteropServices.dll => 0xe56ef253 => 107
	i32 3870376305, ; 362: System.Net.HttpListener.dll => 0xe6b14171 => 65
	i32 3873536506, ; 363: System.Security.Principal => 0xe6e179fa => 128
	i32 3875112723, ; 364: System.Security.Cryptography.Encoding.dll => 0xe6f98713 => 122
	i32 3885497537, ; 365: System.Net.WebHeaderCollection.dll => 0xe797fcc1 => 77
	i32 3888767677, ; 366: Xamarin.AndroidX.ProfileInstaller.ProfileInstaller => 0xe7c9e2bd => 186
	i32 3896106733, ; 367: System.Collections.Concurrent.dll => 0xe839deed => 8
	i32 3896760992, ; 368: Xamarin.AndroidX.Core.dll => 0xe843daa0 => 181
	i32 3901907137, ; 369: Microsoft.VisualBasic.Core.dll => 0xe89260c1 => 2
	i32 3910130544, ; 370: Xamarin.AndroidX.Collection.Jvm => 0xe90fdb70 => 179
	i32 3920810846, ; 371: System.IO.Compression.FileSystem.dll => 0xe9b2d35e => 44
	i32 3921031405, ; 372: Xamarin.AndroidX.VersionedParcelable.dll => 0xe9b630ed => 189
	i32 3928044579, ; 373: System.Xml.ReaderWriter => 0xea213423 => 156
	i32 3930554604, ; 374: System.Security.Principal.dll => 0xea4780ec => 128
	i32 3945713374, ; 375: System.Data.DataSetExtensions.dll => 0xeb2ecede => 23
	i32 3953953790, ; 376: System.Text.Encoding.CodePages => 0xebac8bfe => 133
	i32 4003436829, ; 377: System.Diagnostics.Process.dll => 0xee9f991d => 29
	i32 4015948917, ; 378: Xamarin.AndroidX.Annotation.Jvm.dll => 0xef5e8475 => 175
	i32 4025784931, ; 379: System.Memory => 0xeff49a63 => 62
	i32 4054681211, ; 380: System.Reflection.Emit.ILGeneration => 0xf1ad867b => 90
	i32 4068434129, ; 381: System.Private.Xml.Linq.dll => 0xf27f60d1 => 87
	i32 4073602200, ; 382: System.Threading.dll => 0xf2ce3c98 => 148
	i32 4099507663, ; 383: System.Drawing.dll => 0xf45985cf => 36
	i32 4100113165, ; 384: System.Private.Uri => 0xf462c30d => 86
	i32 4127667938, ; 385: System.IO.FileSystem.Watcher => 0xf60736e2 => 50
	i32 4130442656, ; 386: System.AppContext => 0xf6318da0 => 6
	i32 4147896353, ; 387: System.Reflection.Emit.ILGeneration.dll => 0xf73be021 => 90
	i32 4151237749, ; 388: System.Core => 0xf76edc75 => 21
	i32 4159265925, ; 389: System.Xml.XmlSerializer => 0xf7e95c85 => 162
	i32 4161255271, ; 390: System.Reflection.TypeExtensions => 0xf807b767 => 96
	i32 4164802419, ; 391: System.IO.FileSystem.Watcher.dll => 0xf83dd773 => 50
	i32 4181436372, ; 392: System.Runtime.Serialization.Primitives => 0xf93ba7d4 => 113
	i32 4185676441, ; 393: System.Security => 0xf97c5a99 => 130
	i32 4196529839, ; 394: System.Net.WebClient.dll => 0xfa21f6af => 76
	i32 4213026141, ; 395: System.Diagnostics.DiagnosticSource.dll => 0xfb1dad5d => 27
	i32 4260525087, ; 396: System.Buffers => 0xfdf2741f => 7
	i32 4274976490 ; 397: System.Runtime.Numerics => 0xfecef6ea => 110
], align 4

@assembly_image_cache_indices = dso_local local_unnamed_addr constant [398 x i32] [
	i32 68, ; 0
	i32 67, ; 1
	i32 108, ; 2
	i32 184, ; 3
	i32 190, ; 4
	i32 48, ; 5
	i32 80, ; 6
	i32 145, ; 7
	i32 30, ; 8
	i32 124, ; 9
	i32 102, ; 10
	i32 107, ; 11
	i32 139, ; 12
	i32 194, ; 13
	i32 77, ; 14
	i32 124, ; 15
	i32 13, ; 16
	i32 178, ; 17
	i32 132, ; 18
	i32 151, ; 19
	i32 0, ; 20
	i32 18, ; 21
	i32 26, ; 22
	i32 1, ; 23
	i32 59, ; 24
	i32 42, ; 25
	i32 91, ; 26
	i32 147, ; 27
	i32 182, ; 28
	i32 54, ; 29
	i32 69, ; 30
	i32 83, ; 31
	i32 183, ; 32
	i32 131, ; 33
	i32 55, ; 34
	i32 149, ; 35
	i32 74, ; 36
	i32 145, ; 37
	i32 62, ; 38
	i32 146, ; 39
	i32 198, ; 40
	i32 165, ; 41
	i32 12, ; 42
	i32 125, ; 43
	i32 152, ; 44
	i32 113, ; 45
	i32 166, ; 46
	i32 164, ; 47
	i32 182, ; 48
	i32 84, ; 49
	i32 150, ; 50
	i32 194, ; 51
	i32 60, ; 52
	i32 51, ; 53
	i32 103, ; 54
	i32 114, ; 55
	i32 40, ; 56
	i32 120, ; 57
	i32 52, ; 58
	i32 44, ; 59
	i32 119, ; 60
	i32 81, ; 61
	i32 136, ; 62
	i32 189, ; 63
	i32 176, ; 64
	i32 8, ; 65
	i32 73, ; 66
	i32 155, ; 67
	i32 196, ; 68
	i32 154, ; 69
	i32 92, ; 70
	i32 191, ; 71
	i32 45, ; 72
	i32 195, ; 73
	i32 109, ; 74
	i32 129, ; 75
	i32 25, ; 76
	i32 72, ; 77
	i32 55, ; 78
	i32 46, ; 79
	i32 22, ; 80
	i32 86, ; 81
	i32 43, ; 82
	i32 160, ; 83
	i32 71, ; 84
	i32 3, ; 85
	i32 42, ; 86
	i32 63, ; 87
	i32 16, ; 88
	i32 53, ; 89
	i32 190, ; 90
	i32 105, ; 91
	i32 195, ; 92
	i32 183, ; 93
	i32 34, ; 94
	i32 158, ; 95
	i32 85, ; 96
	i32 32, ; 97
	i32 12, ; 98
	i32 51, ; 99
	i32 56, ; 100
	i32 36, ; 101
	i32 35, ; 102
	i32 58, ; 103
	i32 17, ; 104
	i32 192, ; 105
	i32 164, ; 106
	i32 153, ; 107
	i32 176, ; 108
	i32 29, ; 109
	i32 52, ; 110
	i32 179, ; 111
	i32 5, ; 112
	i32 187, ; 113
	i32 196, ; 114
	i32 175, ; 115
	i32 85, ; 116
	i32 61, ; 117
	i32 112, ; 118
	i32 57, ; 119
	i32 99, ; 120
	i32 19, ; 121
	i32 111, ; 122
	i32 101, ; 123
	i32 102, ; 124
	i32 104, ; 125
	i32 71, ; 126
	i32 38, ; 127
	i32 32, ; 128
	i32 103, ; 129
	i32 73, ; 130
	i32 9, ; 131
	i32 123, ; 132
	i32 46, ; 133
	i32 9, ; 134
	i32 43, ; 135
	i32 4, ; 136
	i32 31, ; 137
	i32 138, ; 138
	i32 92, ; 139
	i32 93, ; 140
	i32 49, ; 141
	i32 141, ; 142
	i32 112, ; 143
	i32 140, ; 144
	i32 115, ; 145
	i32 157, ; 146
	i32 76, ; 147
	i32 79, ; 148
	i32 37, ; 149
	i32 64, ; 150
	i32 138, ; 151
	i32 15, ; 152
	i32 116, ; 153
	i32 188, ; 154
	i32 48, ; 155
	i32 70, ; 156
	i32 80, ; 157
	i32 126, ; 158
	i32 94, ; 159
	i32 121, ; 160
	i32 193, ; 161
	i32 26, ; 162
	i32 97, ; 163
	i32 28, ; 164
	i32 149, ; 165
	i32 169, ; 166
	i32 4, ; 167
	i32 98, ; 168
	i32 33, ; 169
	i32 93, ; 170
	i32 21, ; 171
	i32 41, ; 172
	i32 170, ; 173
	i32 192, ; 174
	i32 2, ; 175
	i32 134, ; 176
	i32 111, ; 177
	i32 58, ; 178
	i32 95, ; 179
	i32 39, ; 180
	i32 177, ; 181
	i32 25, ; 182
	i32 94, ; 183
	i32 89, ; 184
	i32 99, ; 185
	i32 10, ; 186
	i32 185, ; 187
	i32 87, ; 188
	i32 100, ; 189
	i32 193, ; 190
	i32 7, ; 191
	i32 88, ; 192
	i32 154, ; 193
	i32 33, ; 194
	i32 116, ; 195
	i32 82, ; 196
	i32 20, ; 197
	i32 11, ; 198
	i32 162, ; 199
	i32 3, ; 200
	i32 84, ; 201
	i32 197, ; 202
	i32 64, ; 203
	i32 143, ; 204
	i32 157, ; 205
	i32 41, ; 206
	i32 185, ; 207
	i32 117, ; 208
	i32 131, ; 209
	i32 75, ; 210
	i32 66, ; 211
	i32 172, ; 212
	i32 173, ; 213
	i32 143, ; 214
	i32 106, ; 215
	i32 151, ; 216
	i32 70, ; 217
	i32 156, ; 218
	i32 121, ; 219
	i32 127, ; 220
	i32 152, ; 221
	i32 141, ; 222
	i32 20, ; 223
	i32 14, ; 224
	i32 135, ; 225
	i32 75, ; 226
	i32 59, ; 227
	i32 167, ; 228
	i32 168, ; 229
	i32 15, ; 230
	i32 74, ; 231
	i32 6, ; 232
	i32 23, ; 233
	i32 184, ; 234
	i32 91, ; 235
	i32 1, ; 236
	i32 136, ; 237
	i32 0, ; 238
	i32 134, ; 239
	i32 69, ; 240
	i32 146, ; 241
	i32 197, ; 242
	i32 88, ; 243
	i32 96, ; 244
	i32 31, ; 245
	i32 45, ; 246
	i32 109, ; 247
	i32 158, ; 248
	i32 35, ; 249
	i32 22, ; 250
	i32 114, ; 251
	i32 57, ; 252
	i32 188, ; 253
	i32 144, ; 254
	i32 118, ; 255
	i32 120, ; 256
	i32 110, ; 257
	i32 139, ; 258
	i32 54, ; 259
	i32 105, ; 260
	i32 133, ; 261
	i32 191, ; 262
	i32 159, ; 263
	i32 163, ; 264
	i32 132, ; 265
	i32 161, ; 266
	i32 140, ; 267
	i32 169, ; 268
	i32 40, ; 269
	i32 81, ; 270
	i32 56, ; 271
	i32 37, ; 272
	i32 97, ; 273
	i32 166, ; 274
	i32 172, ; 275
	i32 82, ; 276
	i32 174, ; 277
	i32 98, ; 278
	i32 30, ; 279
	i32 159, ; 280
	i32 18, ; 281
	i32 127, ; 282
	i32 119, ; 283
	i32 187, ; 284
	i32 165, ; 285
	i32 198, ; 286
	i32 170, ; 287
	i32 16, ; 288
	i32 144, ; 289
	i32 125, ; 290
	i32 118, ; 291
	i32 38, ; 292
	i32 115, ; 293
	i32 47, ; 294
	i32 142, ; 295
	i32 117, ; 296
	i32 34, ; 297
	i32 95, ; 298
	i32 53, ; 299
	i32 129, ; 300
	i32 153, ; 301
	i32 24, ; 302
	i32 161, ; 303
	i32 148, ; 304
	i32 104, ; 305
	i32 89, ; 306
	i32 60, ; 307
	i32 142, ; 308
	i32 100, ; 309
	i32 5, ; 310
	i32 13, ; 311
	i32 122, ; 312
	i32 135, ; 313
	i32 28, ; 314
	i32 72, ; 315
	i32 24, ; 316
	i32 177, ; 317
	i32 186, ; 318
	i32 137, ; 319
	i32 181, ; 320
	i32 168, ; 321
	i32 101, ; 322
	i32 123, ; 323
	i32 163, ; 324
	i32 167, ; 325
	i32 39, ; 326
	i32 17, ; 327
	i32 171, ; 328
	i32 137, ; 329
	i32 150, ; 330
	i32 180, ; 331
	i32 155, ; 332
	i32 130, ; 333
	i32 19, ; 334
	i32 65, ; 335
	i32 147, ; 336
	i32 47, ; 337
	i32 79, ; 338
	i32 61, ; 339
	i32 106, ; 340
	i32 174, ; 341
	i32 49, ; 342
	i32 14, ; 343
	i32 68, ; 344
	i32 171, ; 345
	i32 180, ; 346
	i32 78, ; 347
	i32 108, ; 348
	i32 173, ; 349
	i32 67, ; 350
	i32 63, ; 351
	i32 27, ; 352
	i32 160, ; 353
	i32 178, ; 354
	i32 10, ; 355
	i32 11, ; 356
	i32 78, ; 357
	i32 126, ; 358
	i32 83, ; 359
	i32 66, ; 360
	i32 107, ; 361
	i32 65, ; 362
	i32 128, ; 363
	i32 122, ; 364
	i32 77, ; 365
	i32 186, ; 366
	i32 8, ; 367
	i32 181, ; 368
	i32 2, ; 369
	i32 179, ; 370
	i32 44, ; 371
	i32 189, ; 372
	i32 156, ; 373
	i32 128, ; 374
	i32 23, ; 375
	i32 133, ; 376
	i32 29, ; 377
	i32 175, ; 378
	i32 62, ; 379
	i32 90, ; 380
	i32 87, ; 381
	i32 148, ; 382
	i32 36, ; 383
	i32 86, ; 384
	i32 50, ; 385
	i32 6, ; 386
	i32 90, ; 387
	i32 21, ; 388
	i32 162, ; 389
	i32 96, ; 390
	i32 50, ; 391
	i32 113, ; 392
	i32 130, ; 393
	i32 76, ; 394
	i32 27, ; 395
	i32 7, ; 396
	i32 110 ; 397
], align 4

@marshal_methods_number_of_classes = dso_local local_unnamed_addr constant i32 0, align 4

@marshal_methods_class_cache = dso_local local_unnamed_addr global [0 x %struct.MarshalMethodsManagedClass] zeroinitializer, align 4

; Names of classes in which marshal methods reside
@mm_class_names = dso_local local_unnamed_addr constant [0 x ptr] zeroinitializer, align 4

@mm_method_names = dso_local local_unnamed_addr constant [1 x %struct.MarshalMethodName] [
	%struct.MarshalMethodName {
		i64 0, ; id 0x0; name: 
		ptr @.MarshalMethodName.0_name; char* name
	} ; 0
], align 8

; get_function_pointer (uint32_t mono_image_index, uint32_t class_index, uint32_t method_token, void*& target_ptr)
@get_function_pointer = internal dso_local unnamed_addr global ptr null, align 4

; Functions

; Function attributes: "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" uwtable willreturn
define void @xamarin_app_init(ptr nocapture noundef readnone %env, ptr noundef %fn) local_unnamed_addr #0
{
	%fnIsNull = icmp eq ptr %fn, null
	br i1 %fnIsNull, label %1, label %2

1: ; preds = %0
	%putsResult = call noundef i32 @puts(ptr @.str.0)
	call void @abort()
	unreachable 

2: ; preds = %1, %0
	store ptr %fn, ptr @get_function_pointer, align 4, !tbaa !3
	ret void
}

; Strings
@.str.0 = private unnamed_addr constant [40 x i8] c"get_function_pointer MUST be specified\0A\00", align 1

;MarshalMethodName
@.MarshalMethodName.0_name = private unnamed_addr constant [1 x i8] c"\00", align 1

; External functions

; Function attributes: noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8"
declare void @abort() local_unnamed_addr #2

; Function attributes: nofree nounwind
declare noundef i32 @puts(ptr noundef) local_unnamed_addr #1
attributes #0 = { "min-legal-vector-width"="0" mustprogress nofree norecurse nosync "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="generic" "target-features"="+armv7-a,+d32,+dsp,+fp64,+neon,+vfp2,+vfp2sp,+vfp3,+vfp3d16,+vfp3d16sp,+vfp3sp,-aes,-fp-armv8,-fp-armv8d16,-fp-armv8d16sp,-fp-armv8sp,-fp16,-fp16fml,-fullfp16,-sha2,-thumb-mode,-vfp4,-vfp4d16,-vfp4d16sp,-vfp4sp" uwtable willreturn }
attributes #1 = { nofree nounwind }
attributes #2 = { noreturn "no-trapping-math"="true" nounwind "stack-protector-buffer-size"="8" "target-cpu"="generic" "target-features"="+armv7-a,+d32,+dsp,+fp64,+neon,+vfp2,+vfp2sp,+vfp3,+vfp3d16,+vfp3d16sp,+vfp3sp,-aes,-fp-armv8,-fp-armv8d16,-fp-armv8d16sp,-fp-armv8sp,-fp16,-fp16fml,-fullfp16,-sha2,-thumb-mode,-vfp4,-vfp4d16,-vfp4d16sp,-vfp4sp" }

; Metadata
!llvm.module.flags = !{!0, !1, !7}
!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!llvm.ident = !{!2}
!2 = !{!"Xamarin.Android remotes/origin/release/8.0.1xx @ af27162bee43b7fecdca59b4f67aa8c175cbc875"}
!3 = !{!4, !4, i64 0}
!4 = !{!"any pointer", !5, i64 0}
!5 = !{!"omnipotent char", !6, i64 0}
!6 = !{!"Simple C++ TBAA"}
!7 = !{i32 1, !"min_enum_size", i32 4}
