document.addEventListener("DOMContentLoaded", function () {
    // Modal inject
    const modalHTML = `
    <div class="modal fade" id="backConfirmModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center p-3">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="Exit" width="80" class="mx-auto d-block mb-3" draggable="false" loading="lazy"/>
          <h5 class="fw-bold">Exit this Page?</h5>
          <p class="text-muted mb-3">Are you sure you want to go back?</p>
          <div class="d-flex justify-content-center gap-3">
            <button id="confirmBackYes" class="btn btn-success px-4">YES</button>
            <button id="confirmBackNo" class="btn btn-danger px-4" data-bs-dismiss="modal">NO</button>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = new bootstrap.Modal(document.getElementById('backConfirmModal'));
    const yesBtn = document.getElementById("confirmBackYes");

    // catch all back links (even if onclick present)
    const backLinks = document.querySelectorAll("a.back-link");

    backLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();  // stop href / onclick
            modal.show();
        });
    });

    yesBtn.addEventListener("click", function () {
        window.history.back();
    });
});
