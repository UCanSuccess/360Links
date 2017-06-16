<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Apis extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('index');
	}

	public function login()
	{
		$this->load->model('Users_model');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$loginInfo = $json_array['loginInfo'];
		$id = $this->Users_model->login($loginInfo);
		echo json_encode($id);
	}
	
	public function getUser()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$user_id = $json_array['user_id'];
		$this->load->model('Users_model');
		$resp = $this->Users_model->get_user_info($user_id);
		echo json_encode($resp);
	}

	public function getUsersFromMe()
	{
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$user_id = $json_array['user_id'];
		$this->load->model('Users_model');
		$resp = $this->Users_model->get_users_out_me($user_id);
		echo json_encode($resp);
	}

	public function getUserBusiness()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$user_id = $json_array['user_id'];
		$this->load->model('Providers_model');
		$resp = $this->Providers_model->get_provide_business($user_id);
		foreach ($resp as $key => $value) {
			# code...
			$resp[$key]->rate = $this->Service_verify->get_rate($value->user_id, $value->business_id);
		}
		echo json_encode($resp);
	}

	public function getEndorsedBusiness()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$user_id = $json_array['user_id'];
		$this->load->model('Endorsed_model');
		$resp = $this->Endorsed_model->get_endorsed_business($user_id);
		foreach ($resp as $key => $value) {
			# code...
			$resp[$key]->rate = $this->Service_verify->get_rate($value->provider_id, $value->business_id);
		}
		echo json_encode($resp);
	}

	public function getBusinessList()
	{
		$this->load->model('Business_model');
		$resp = $this->Business_model->get_business_list();
		echo json_encode($resp);
	}

	public function searchResult()
	{
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$user_id = $json_array['user_id'];
		$business_id = $json_array['business_id'];
		$this->load->model('Providers_model');
		$resp = $this->Providers_model->searchProviders($user_id, $business_id);
		echo json_encode($resp);
	}

	public function getBusinessDetail()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$business_id = $json_array['business_id'];
		$this->load->model('Business_model');
		$business = $this->Business_model->get_business_detail($business_id);
		$this->load->model('Providers_model');
		$providers = $this->Providers_model->get_business_providers($business_id);
		foreach ($providers as $key => $value) {
			# code...
			$providers[$key]->rate = $this->Service_verify->get_rate($value->user_id, $value->business_id);
		}
		$this->load->model('Users_model');
		$outbusiness = $this->Users_model->get_outbisuness_providers($business_id);
		echo json_encode(array(
				'business_detail'=>$business,
				'providers_list'=>$providers,
				'out_business'=>$outbusiness
			));
	}

	public function editBusiness()
	{
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$business_id = $json_array['business_id'];
		$business_detail = $json_array['business_detail'];
		$remove_list = $json_array['remove_list'];
		$add_list = $json_array['add_list'];
		$this->load->model('Business_model');
		$this->Business_model->update_business($business_id, $business_detail);
		$this->load->model('Providers_model');
		$this->Providers_model->remove_providers_list($remove_list);
		$this->Providers_model->add_providers_list($business_id,$add_list);
		echo json_encode('success');
	}

	public function addBusiness()
	{
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$business_name = $json_array['business_name'];
		$business_desc = $json_array['business_desc'];
		$this->load->model('Business_model');
		$insert_id = $this->Business_model->insert_business($business_name, $business_desc);
		echo json_encode(array('insert_id'=>$insert_id));
	}

	public function endorseBusiness()
	{
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$request = array();
		$request['business_id'] = $json_array['business_id'];
		$request['endorser_id'] = $json_array['endorser_id'];
		$request['provider_id'] = $json_array['provider_id'];
		$this->load->model('Endorsed_model');
		$check = $this->Endorsed_model->check_duplicate($request);
		if($check){
			echo json_encode('duplicated');
		}else{
			$this->Endorsed_model->add_endorse($request);
			echo json_encode('success');
		}
	}

	public function requireVerify()
	{
		// $this->load->helper('url');
		// redirect('http://localhost/#/front/pages/user');
		$this->load->model('Service_verify');
		$config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['max_size']             = 10000;
        $config['max_width']            = 1900;
        $config['max_height']           = 1640;
        $input = array();
        $input['provider'] = $this->input->post('provider');
        $input['business_id'] = $this->input->post('business');
        if(!$input['provider']){
        	redirect(base_url().'/#/front/pages/user');
        }
        if(!$input['business_id']){
        	redirect(base_url().'/#/front/pages/user');
        }
        $input['receiver'] = $this->input->post('receiver');
        $input['amount_spent'] = $this->input->post('amount_spent');
        $this->load->library('upload', $config);
        if ( ! $this->upload->do_upload('file'))
        {
                $error = array('error' => $this->upload->display_errors());
        }
        else
        {
                $data = array('upload_data' => $this->upload->data());
                $input['verify_img'] = $data['upload_data']['file_name'];
                $this->Service_verify->add_request($input);
        }
        redirect(base_url().'/#/front/pages/user');
	}

	public function getVerifyList()
	{
		$this->load->model('Service_verify');
		$resp = $this->Service_verify->get_verify_list();
		echo json_encode($resp);
	}

	public function getVerifyDetail()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$verify_id = $json_array['verify_id'];
		$result = $this->Service_verify->get_verify_detail($verify_id);
		echo json_encode($result);
	}

	public function updateVerify()
	{
		$this->load->model('Service_verify');
		$json_array = json_decode(file_get_contents("php://input"),TRUE);
		$verify_id = $json_array['verify_id'];
		$data['rate'] = $json_array['rate'];
		$data['status'] = 1;
		$this->Service_verify->update_verify($verify_id, $data);
		echo json_encode('succuess');
	}
}
