import axios from "axios";

export async function CreateStreamlineJob(referenceGenome, referenceChromosome, fastaFile) {
    let formData = new FormData();

    formData.append('referenceGenome', referenceGenome)
    formData.append('referenceChromosome', referenceChromosome)
    formData.append('fastaFile', fastaFile)

    console.log("Enter the Streamline Job Creation function")
    console.log(referenceGenome)
    try {

        let response = await axios.post(window.location.protocol+"//"+window.location.hostname+"/crisprstreamlineapi/create_streamline_job", formData, {
            headers : { 'Content-Type': 'multipart/form-data' }
        })

        if (response.data.success) {
            let job_id = response.data['job_id']
            window.location.href = '/crisprstreamline/job/'+job_id
            console.log(response.output)
            return true
        }


    }
    catch (e) {
        console.log("catch in create streamline_web job")
    }
}

export async function GetJobStatus(jobId) {
    try {
        console.log(jobId)
        let formData = new FormData();

        formData.append('job_id', jobId)

        // console.log(formData)

        let response = await axios.post(window.location.protocol+"//"+window.location.hostname+"/crisprstreamlineapi/check_job_status", formData)

        console.log(response.data)

        if (response.data.success) {
            return response.data
        }

    }
    catch (e) {
        console.log("catch in job status")
    }
}

/*TODO: Modify these functions so they reflect the nature of our outputs.*/
export async function GetAvailableDatabases() {
    try {
        let response = await axios.get(window.location.protocol+"//"+window.location.hostname+"/crisprstreamlineapi/available_databases")

        console.log('available db response', response.data)
        return response.data.databases
    }
    catch (e) {
        console.error(e)
        return []
    }
}

export async function DownloadResults(jobId, format) {
    let resultsUrl = `${window.location.protocol}//${window.location.hostname}/crisprstreamlineapi/results/${format}/${jobId}`
    window.open(resultsUrl, '_blank')
}