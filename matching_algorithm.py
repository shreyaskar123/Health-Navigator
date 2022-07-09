import pyodbc
import pandas as pd
import numpy as np
import warnings
from geopy import distance
import geocoder 
import sys
def language_function(prov_lang, prov_flu, pat_lang, pat_flu):
    lang_score = 0 
    for index in range(prov_lang.size):
        if (prov_lang[index] in pat_lang):
            pat_index = np.where(pat_lang == prov_lang[index]) # pat_lang.index(prov_lang[index])
            lang_score = lang_score + prov_flu[index] * pat_flu[pat_index]
    return lang_score

def comp_lat_long(addr):
 g_location = geocoder.osm(addr)
 lat_long_coord = [] 
 try:
    lat_long_coord.append([g_location.osm['y'],g_location.osm['x']])
 except:
    short_address = addr[::-1][0:20][::-1]
    g_location = geocoder.osm(short_address)
    try:
        lat_long_coord.append([g_location.osm['y'],g_location.osm['x']])
    except:
        zip_code = addr[::-1][0:5][::-1]
        g_location = geocoder.osm(zip_code)
        lat_long_coord.append([g_location.osm['y'],g_location.osm['x']])
 return lat_long_coord

def distance_function(prov_address, pat_address):
    prov_lat_long = tuple(comp_lat_long(prov_address)) 
    pat_lat_long = tuple(comp_lat_long(pat_address))
    return (distance.distance(prov_lat_long, pat_lat_long).miles)

server = 'localhost'
database = 'Louiv_Asian_Healthcare_Worker' 
username = '##############' 
password = '###################################'  
warnings.filterwarnings("ignore")
cnxn = pyodbc.connect('DRIVER={MySQL ODBC 8.0 ANSI Driver};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
query_user_info = "SELECT * FROM USER_INFO;"
query_service_provider = "SELECT * FROM SERVICE_PROVIDER" 
query_language_spoken = "SELECT * FROM LANGUAGES_SPOKEN"
df_user = pd.read_sql(query_user_info, cnxn)
df_provider = pd.read_sql(query_service_provider, cnxn)
df_languages = pd.read_sql(query_language_spoken, cnxn)
patient_id = int(sys.argv[2]) 
requiredService = sys.argv[1] 

patient_langs = df_languages[df_languages['ID'] == patient_id]['Language_Spoken'].to_numpy()
langs_fluency = df_languages[df_languages['ID'] == patient_id]['Profi_Level'].to_numpy()
patient_address = df_user[df_user['ID'] == patient_id]['Address'].to_numpy()
matched_list = df_provider[df_provider['Service_TYPE'] == requiredService]['Provider_ID'].to_numpy()
matched_lang = [] 
matched_fluency = [] 
matched_address = [] 
matched_experience = [] 
for id in matched_list: 
    matched_lang.append(df_languages[df_languages['ID'] == id]['Language_Spoken'].to_numpy())
    matched_fluency.append(df_languages[df_languages['ID'] == id]['Profi_Level'].to_numpy())
    matched_address.append(df_user[df_user['ID'] == id]['Address'].to_numpy()[0])
    matched_experience.append(df_provider[df_provider['Provider_ID'] == id]['Experience'].to_numpy()[0])

matched_data = {'ID': matched_list, 
                'Language': matched_lang, 
                'Fluency': matched_fluency, 
                'Address': matched_address, 
                'Experience': matched_experience}

df_matched_dataset = pd.DataFrame(matched_data)

matched_langscore = [] 
for index in range(df_matched_dataset.shape[0]):
    matched_langscore.append(language_function(df_matched_dataset['Language'][index], df_matched_dataset['Fluency'][index], patient_langs, langs_fluency))

matched_distance = [] 
for index in range(df_matched_dataset.shape[0]):
    matched_distance.append(distance_function(df_matched_dataset['Address'][index], patient_address))

df_matched_dataset.insert(5, "Language_Score", matched_langscore)
df_matched_dataset.insert(6, 'Distance_Score', matched_distance)

lang_threshold = 2
df_matched_dataset = df_matched_dataset[df_matched_dataset['Language_Score'] >= lang_threshold]
output_df = pd.DataFrame()
max_exp = df_matched_dataset['Experience'].max() 

num_displayed = 3
num_added = 0 
offset = 0 
df_matched_dataset.sort_values(by = 'Experience', ascending = False)
while(num_added < num_displayed):
    for index, row in df_matched_dataset.iterrows():
        if (row['Experience'] >= max_exp - offset):
            output_df = output_df.append(row, ignore_index = True)
            df_matched_dataset.drop(index, inplace = True)
            num_added = num_added + 1
        offset = offset + 1 

output_id = ""
output_lang_score = ""
output_dist_score = ""
exp = ""
if (num_added > num_displayed):
    output_df.sort_values(by = 'Experience', ascending = False)
    for index, value in (output_df[0:num_displayed]).iterrows():
        output_id = output_id + str(value['ID']) + " "
        output_lang_score = output_lang_score + str(value['Language_Score'][0]) + " "
        output_dist_score = output_dist_score + str(value['Distance_Score']) + " "
else:
    for index, value in (output_df[0:num_displayed]).iterrows():
        output_id = output_id + str(value['ID']) + " "
        output_lang_score = output_lang_score + str(value['Language_Score'][0]) + " "
        output_dist_score = output_dist_score + str(value['Distance_Score']) + " "

print(output_id)
print(output_lang_score)
print(output_dist_score)
sys.stdout.flush()

